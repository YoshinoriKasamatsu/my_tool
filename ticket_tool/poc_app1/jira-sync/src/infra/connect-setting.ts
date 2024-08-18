import * as fs from 'fs';
import { CONFIG_FILE_PATH, OUTPUT_DIR } from './const-definitions';

export interface CredentialInfo{
    endPoint: string;
    userName: string;
    password: string;
}

export interface ProjectInfo {
    projectKey: string;
    projectName: string;
    isSync: boolean;
}

export type ConnectSetting = {
    credentialInfo: CredentialInfo;
    projectInfos: ProjectInfo[];
}

export const ConnectSetting = {
    isExists(): boolean {
        return fs.existsSync(CONFIG_FILE_PATH);
    },
    createDefault(): ConnectSetting {
        return {
            credentialInfo: {
                endPoint: '',
                userName: '',
                password: ''
            },
            projectInfos: []
        };
    },
    load() {
        const setting = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
        return JSON.parse(setting) as ConnectSetting;
    },
    save(setting: ConnectSetting) {
        // CONFIG_FILE_PATHのディレクトリが存在しない場合は作成
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(setting, null, 4), 'utf8');
    }
}




