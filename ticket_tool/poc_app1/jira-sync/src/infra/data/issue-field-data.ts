import { firstValueFrom } from "rxjs";
import type { ConnectSetting } from "../connect-setting";
import { Field } from "../api/issue-field";
import * as fs from 'fs';
import { DATA_DIR, FIELDS_FILE_PATH, OUTPUT_DIR } from "../const-definitions";


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

export const FieldsData = {
    SyncData: async (connectionSetting: ConnectSetting) => {
        const feild = await firstValueFrom(Field.Get(connectionSetting.credentialInfo));
        // フィールドデータをjson形式で保存する
        const fieldsJson = JSON.stringify(feild);
        // フィールドデータファイルの有無を確認
        if (!fs.existsSync(FIELDS_FILE_PATH)) {
            if (!fs.existsSync(DATA_DIR)) {
                console.log('Create output directory.');
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }
            // フィールドデータファイルが存在しない場合は作成
            fs.writeFileSync(FIELDS_FILE_PATH, fieldsJson, 'utf8');
        }else{
            const beforeFields = fs.readFileSync(FIELDS_FILE_PATH, 'utf8');
            // フィールドデータが変更されているか確認
            if(fieldsJson !== beforeFields){
                console.log('Fields data has been updated.');
                fs.writeFileSync(FIELDS_FILE_PATH, fieldsJson, 'utf8');
            }
        }
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