import { ConnectSetting } from './infra/connect-setting';
import { Field } from './infra/api/issue-field';
import { IssueSearch } from './infra/api/issue-search';
import { firstValueFrom } from 'rxjs';
import { Projects } from './infra/api/projects';
import { FIELDS_FILE_PATH, OUTPUT_DIR } from './infra/const-definitions';
import * as fs from 'fs';
import * as Path from 'path';
import { FieldsData } from './infra/data/issue-field-data';
import { ProjectsData } from './infra/data/projects-data';


function createDefaultConfig() {
    ConnectSetting.save(ConnectSetting.createDefault());
    console.log('Please set up your configuration file.');
}

async function syncTicket(connectionSetting: ConnectSetting) {
    FieldsData.SyncData(connectionSetting);
    ProjectsData.SyncData(connectionSetting); 
}

if (!ConnectSetting.isExists()) {
    createDefaultConfig();
}else {
    const connectionSetting = ConnectSetting.load();
    if(connectionSetting.projectInfos.length === 0){
        const projects = await firstValueFrom(Projects.Get(connectionSetting.credentialInfo));
        if (projects !== null ) {
            const projectInfos = projects.map(p => { return { projectKey: p.key, projectName: p.name, isSync: false } });
            console.log(projectInfos);
            connectionSetting.projectInfos = projectInfos;
            ConnectSetting.save(connectionSetting);
        }
    }else{
        await syncTicket(connectionSetting);
    }
}