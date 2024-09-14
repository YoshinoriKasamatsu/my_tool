import { firstValueFrom } from "rxjs";
import type { ConnectSetting, CredentialInfo } from "../connect-setting";
import { Field, IssueType, Priority, Project, Status, User } from "../api/issue-schema";
import * as fs from 'fs';
import { DATA_DIR, FIELDS_FILE_PATH, ISSUE_TYPE_FILE_PATH, OUTPUT_DIR, PRIORITY_FILE_PATH, PROJECT_FILE_PATH, STATUS_FILE_PATH, USER_FILE_PATH } from "../const-definitions";


export type FieldData = {
    id: string;
    name: string;
    custom: boolean;
    orderable: boolean;
    navigable: boolean;
    searchable: boolean;
    clauseNames: string[];
    schema: {
        type: string;
        system: string;
    }
}

export const SchemaData = {
    SyncData: async (connectionSetting: ConnectSetting) => {

        if (!fs.existsSync(DATA_DIR)) {
            console.log('Create output directory.');
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        const getShcemaData = async (func: Function, filePath: string) => {
            // issuetype
            const schemaData = await firstValueFrom(func(connectionSetting.credentialInfo));
            // フィールドデータをjson形式で保存する
            const schemaJson = JSON.stringify(schemaData, null, 2);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, schemaJson, 'utf8');
            }else{
                const beforeJson = fs.readFileSync(filePath, 'utf8');
                // フィールドデータが変更されているか確認
                if(schemaJson !== beforeJson){
                    console.log('Schema data has been updated.');
                    fs.writeFileSync(filePath, schemaJson, 'utf8');
                }
            }
        }
        // field
        await getShcemaData(Field.Get, FIELDS_FILE_PATH);
        // issuetype
        await getShcemaData(IssueType.Get, ISSUE_TYPE_FILE_PATH);
        // priority
        await getShcemaData(Priority.Get, PRIORITY_FILE_PATH);
        // project
        await getShcemaData(Project.Get, PROJECT_FILE_PATH);
        // status
        await getShcemaData(Status.Get, STATUS_FILE_PATH);
        // user
        await getShcemaData(User.Get, USER_FILE_PATH);
    },

    ReadData: async (): Promise<FieldData[]> => {
        // フィールドデータファイルが存在しない場合は処理を終了
        if (!fs.existsSync(FIELDS_FILE_PATH)) {
            console.log('Fields data file does not exist.');
            return [];
        }
        const fields = fs.readFileSync(FIELDS_FILE_PATH, 'utf8');
        
        return JSON.parse(fields);
    }
}