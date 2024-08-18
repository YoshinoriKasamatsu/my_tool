import { firstValueFrom } from "rxjs";
import { ProjectSyncData, type ConnectSetting } from "../connect-setting";
import * as fs from 'fs';
import * as Path from 'path';
import { DATA_DIR, FIELDS_FILE_PATH } from "../const-definitions";
import { IssueSearch } from "../api/issue-search";


export const ProjectsData = {
    SyncData: async (connectionSetting: ConnectSetting) => {
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

            // プロジェクトの同期情報を取得
            let projectSyncData = ProjectSyncData.loadProject(project.projectKey);

            // 更新日時を取得
            let lastUpdated: Date = new Date(0);
            if (projectSyncData === null) {
                projectSyncData = ProjectSyncData.createDefault(project);
            } else {
                lastUpdated = projectSyncData.lastUpdated;
            }

            while(true){

                
                // yyyy-MM-ddTHH:MM形式の文字列に変更(先頭16文字取得)
                const lastUpdatedStr = lastUpdated.toISOString().slice(0, 16).replace('T', ' ');
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
                const jql = `project = ${project.projectKey} AND updated >= '${lastUpdatedStrJST}'${excludeIssueKeys} ORDER BY updated ASC`;
                const result = await firstValueFrom(IssueSearch.Get(connectionSetting.credentialInfo, jql, startAt, maxResults, fields));
                
                if(result === null){
                    break
                }
                for (const issue of result.issues) {
                    console.log(`${issue.key} ${issue.fields.summary} ${issue.fields.updated}`);
                    const issueFilePath = Path.join(project_dir, `${issue.key}.json`);
                    fs.writeFileSync(issueFilePath, JSON.stringify(issue), 'utf8');
                    let issueLastUpdatedStr = new Date(issue.fields.updated);
                    // 更新日時を文字列からDate型に変換
                    let issueLastUpdated = new Date(issueLastUpdatedStr);
                    if (lastUpdatedStr !== issueLastUpdated.toISOString().slice(0, 16).replace('T', ' ')){
                        projectSyncData.lastupdatedIssueKeys = [];
                    }
                    projectSyncData.lastupdatedIssueKeys.push(issue.key);
                    projectSyncData.lastUpdated = issueLastUpdated;
                    lastUpdated = projectSyncData.lastUpdated;
                }
                ProjectSyncData.saveProjectSyncData(projectSyncData);
                total += result.issues.length;
                if (result.total === 0 || result.total === result.maxResults) {
                    // データ同期完了のメッセージ。取得できた件数を表示する。
                    console.log(`Project: ${project.projectKey} ${project.projectName} Data Sync Completed. Total: ${total}`);
                    break;
                }
            }
        }
    }
}