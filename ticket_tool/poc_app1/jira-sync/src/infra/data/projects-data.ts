import { firstValueFrom } from "rxjs";
import { ProjectSyncData, type ConnectSetting, type ProjectInfo } from "../connect-setting";
import * as fs from 'fs';
import * as Path from 'path';
import { DATA_DIR, FIELDS_FILE_PATH } from "../const-definitions";
import { IssueSearch, type Fields } from "../api/issue-search";
import * as duckdb from "duckdb";
import { SchemaData } from "./issue-field-data";
import { Logger } from "../log/logger";


export const ProjectsData = {

    // データベースの初期化
    Initialize: async (connectionSetting: ConnectSetting) => {
        // isSyncがtrueのプロジェクトのみ処理を行う
        const syncProjects = connectionSetting.projectInfos.filter(p => p.isSync);
        const fields = ['*all'];
        const startAt = 0;
        const maxResults = 100;
        let total = 0;
        for (const project of syncProjects) {
            const project_dir = Path.join(DATA_DIR, project.projectKey);
            if (!fs.existsSync(project_dir)) {
                fs.mkdirSync(project_dir, { recursive: true });
            }

            let fieldsDefinitons: string[] = [];
            const fieldsValue = await SchemaData.ReadData();
            
            fieldsValue.forEach(field => {
                switch (field.schema?.type) {
                    case 'number':
                        fieldsDefinitons.push(`${field.id} INTEGER NULL`);
                        break;                        
                    case 'string':
                    case 'date':
                    case 'datetime':
                        fieldsDefinitons.push(`${field.id} ${field.schema.type} NULL`);
                        break;
                    case 'project':
                    case 'issuetype':
                    case 'priority':
                    case 'status':
                        fieldsDefinitons.push(`${field.id}_id INTEGER NULL`);
                        break;
                    case 'user':
                        fieldsDefinitons.push(`${field.id}_accountId INTEGER NULL`);
                        break;
                    case 'array':
                    case 'any':
                        fieldsDefinitons.push(`${field.id} JSON`);
                        break;
                }
            });
            const duckDbFilePath = Path.join(project_dir, 'data.duckdb');
            const db = new duckdb.Database(duckDbFilePath);
            const connect = db.connect();
            try{
                const fieldsDefinitonsStr = fieldsDefinitons.join(', ');
                const crewateIssuesSql = `CREATE TABLE IF NOT EXISTS issues (id INTEGER PRIMARY KEY, key VARCHAR, expand VARCHAR, self VARCHAR, fields JSON, ${fieldsDefinitonsStr});`;
                await connect.exec(crewateIssuesSql, function(err, res){
                    if(err){
                        console.log(err);
                    }
                });

            }catch(e){
                console.error(e);
            }finally{
                connect.close();
                db.close();

                // 1秒待機
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    },
    
    // プロジェクト情報を同期する
    SyncData: async (connectionSetting: ConnectSetting) => {
        const logger = Logger.getInstance();
        logger.info('Project data has been updated.');
        // isSyncがtrueのプロジェクトのみ処理を行う
        const syncProjects = connectionSetting.projectInfos.filter(p => p.isSync);
        const fields = ['*all'];

        for (const project of syncProjects) {
            logger.info(`Project: ${project.projectKey} ${project.projectName} Data Sync Start.`);
            const project_dir = Path.join(DATA_DIR, project.projectKey);
            if (!fs.existsSync(project_dir)) {
                fs.mkdirSync(project_dir, { recursive: true });
            }
            // プロジェクトのDuckDbファイルが存在しない場合は作成する
            await syncProject(project_dir, project, connectionSetting, fields, logger);
        }
    }
}

async function syncProject(project_dir: string, project: ProjectInfo, connectionSetting: ConnectSetting, fields: string[], logger: Logger) {
    const duckDbFilePath = Path.join(project_dir, 'data.duckdb');
    const db = new duckdb.Database(duckDbFilePath);
    const connect = db.connect();

    const fieldsValue = await SchemaData.ReadData();
    // プロジェクトの同期情報を取得
    let projectSyncData = ProjectSyncData.loadProject(project);

    // 更新日時を取得
    let lastUpdated: Date = projectSyncData.lastUpdated;;

    const startAt = 0;
    const maxResults = 100;
    let total = 0;

    while (true) {
        let lastUpdatedJST = new Date(lastUpdated.toISOString());
        // JSTの日時の文字列を取得するために9時間足す
        lastUpdatedJST.setHours(lastUpdatedJST.getHours() + 9);
        const lastUpdatedStrJST = lastUpdatedJST.toISOString().slice(0, 16).replace('T', ' ');

        // 除外するIssueKeyを取得
        let excludeIssueKeys = '';
        if (projectSyncData.lastupdatedIssueKeys.length > 0) {
            excludeIssueKeys = ` AND key NOT IN ('${projectSyncData.lastupdatedIssueKeys.join("','")}')`;
        }

        // JQLを作成
        const jql = `${project.whereCondition} AND updated >= '${lastUpdatedStrJST}'${excludeIssueKeys} ORDER BY ${project.orderBy}`;

        const result = await firstValueFrom(IssueSearch.Get(connectionSetting.credentialInfo, jql, startAt, maxResults, fields));

        if (result === null) {
            break;
        }

        for (const issue of result.issues) {
            // yyyy-MM-ddTHH:MM形式の文字列に変更(先頭16文字取得)
            const lastUpdatedStr = lastUpdated.toISOString().slice(0, 16).replace('T', ' ');

            const fieldObjects = JSON.parse(JSON.stringify(issue.fields));
            const issueFields = fieldObjects as Fields;
            const issueFilePath = Path.join(project_dir, `${issue.key}.json`);
            fs.writeFileSync(issueFilePath, JSON.stringify(issue), 'utf8');

            // 更新日時(yyyy-MM-ddを取得
            let issueLastUpdatedStr = new Date(issueFields.updated);
            // 更新日時を文字列からDate型に変換
            let issueLastUpdated = new Date(issueLastUpdatedStr);
            if (lastUpdatedStr !== issueLastUpdated.toISOString().slice(0, 16).replace('T', ' ')) {
                projectSyncData.lastupdatedIssueKeys = [];
            }
            projectSyncData.lastupdatedIssueKeys.push(issue.key);
            projectSyncData.lastUpdated = issueLastUpdated;


            let fieldNames = ['id', 'key', 'expand', 'self'];
            let fieldValues = [issue.id, `'${issue.key}'`, `'${issue.expand}'`, `'${issue.self}'`];


            for (const field of fieldsValue) {
                let fieldName: string = '';
                let fieldValue: string = '';
                switch (field.schema?.type) {
                    case 'number':
                    case 'string':
                        fieldName = `${field.id}`;
                        fieldValue = fieldObjects[field.id] === null || fieldObjects[field.id] === undefined ? 'null' : `'${fieldObjects[field.id]}'`;
                        break;
                    case 'date':
                    case 'datetime':
                        fieldName = `${field.id}`;
                        fieldValue = fieldObjects[field.id] === null || fieldObjects[field.id] === undefined ? 'null' : `'${fieldObjects[field.id]}'`;
                        break;
                    case 'project':
                    case 'issuetype':
                    case 'priority':
                    case 'status':
                        // fieldName = `${field.id}_id`;
                        // fieldValue = fieldObjects[field.id];
                        break;
                    case 'user':
                        // fieldName = `${field.id}_accountId`;
                        // fieldValue = fieldObjects[field.id];
                        break;
                    case 'array':
                    case 'any':
                        // fieldNames.push(`${field.name}`);
                        // fieldValues.push(`'${fieldObjects[field.id]}'`);
                        break;
                }
                if (fieldName !== '') {
                    fieldNames.push(fieldName);
                    fieldValues.push(fieldValue);
                }

            }

            // DuckDbにデータを登録
            const insertSQL = `INSERT INTO issues(${fieldNames.join(',')}) VALUES (${fieldValues.join(',')});`;
            connect.exec(insertSQL, function (err, res) {
                if (err) {
                    console.log(err);
                }

            });
            lastUpdated = projectSyncData.lastUpdated;
        }
        ProjectSyncData.saveProjectSyncData(projectSyncData);
        total += result.issues.length;
        if (result.total === 0 || result.total === result.maxResults) {
            // データ同期完了のメッセージ。取得できた件数を表示する。
            logger.info(`Project: ${project.projectKey} ${project.projectName} Data Sync Completed. Total: ${total}`);
            break;
        }else{
            logger.info(`next`);
        }
    }

    const rows = await connect.all('SELECT * FROM issues;');    
    console.log(rows);
    try {
        await connect.close();
        await db.close();
    }catch(e){
        console.error(e);
        logger.error('error');
    }


}
