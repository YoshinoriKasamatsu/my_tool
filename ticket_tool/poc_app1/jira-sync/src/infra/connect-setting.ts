import * as fs from 'fs';
import { CONFIG_FILE_PATH, OUTPUT_DIR, SYNC_FILE_PATH } from './const-definitions';

export interface CredentialInfo{
    endPoint: string;
    userName: string;
    password: string;
}

export interface ProjectInfo {
    projectKey: string;
    projectName: string;
    isSync: boolean;
    whereCondition: string;
    orderBy: string;
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

export interface ProjectSyncData {
    projectKey: string;
    projectName: string;
    lastUpdated: Date;
    lastupdatedIssueKeys: string[];
}

export const ProjectSyncData = {
    isExists(): boolean {
        return fs.existsSync(SYNC_FILE_PATH);
    },
    isExistsProject(projectKey: string): boolean {
        const syncData = ProjectSyncData.load();
        return syncData.some(p => p.projectKey === projectKey);
    },
    loadProject(projectKey: string): ProjectSyncData | null {
        if (!ProjectSyncData.isExists()) {
            return null;
        }
        const syncData = ProjectSyncData.load();
        const project = syncData.find(p => p.projectKey === projectKey);
        return project ? project : null;
    },
    createDefault(project: ProjectInfo): ProjectSyncData {
        return {
            projectKey: project.projectKey,
            projectName: project.projectName,
            lastUpdated: new Date(0),
            lastupdatedIssueKeys: []
        };
    },
    load(): ProjectSyncData[] {
        const setting = fs.readFileSync(SYNC_FILE_PATH, 'utf8');
        let projectSyncDataList = JSON.parse(setting) as ProjectSyncData[];
        for (const project of projectSyncDataList) {
            project.lastUpdated = new Date(project.lastUpdated);
        }
        return projectSyncDataList;
    },
    saveProjectSyncData(setting: ProjectSyncData) {
        // CONFIG_FILE_PATHのディレクトリが存在しない場合は作成
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }

        let projectSyncDataList = this.isExists() ? ProjectSyncData.load(): [];
        // キーが存在する場合は上書き
        const index = projectSyncDataList.findIndex(p => p.projectKey === setting.projectKey);
        if (index >= 0) {
            projectSyncDataList[index] = setting;
        } else {
            projectSyncDataList.push(setting);
        }
        
        fs.writeFileSync(SYNC_FILE_PATH, JSON.stringify(projectSyncDataList, null, 4), 'utf8');
    }
}




