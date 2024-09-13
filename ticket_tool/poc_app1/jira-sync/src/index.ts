import { ConnectSetting } from './infra/connect-setting';
import { firstValueFrom } from 'rxjs';
import { Projects } from './infra/api/projects';
import { SchemaData } from './infra/data/issue-field-data';
import { ProjectsData } from './infra/data/projects-data';

/*
    デフォルトの設定ファイルを作成する
*/
function createDefaultConfig() {
    ConnectSetting.save(ConnectSetting.createDefault());
    console.log('Please set up your configuration file.');
}

async function syncTicket(connectionSetting: ConnectSetting) {
    await SchemaData.SyncData(connectionSetting);
    console.log('Schema data has been updated.');   

    await ProjectsData.Initialize(connectionSetting);
    console.log('Project data has been updated.');

    
    await ProjectsData.SyncData(connectionSetting); 
    console.log('Ticket data has been updated.');
}

// 設定ファイルが存在しない場合は作成する
if (!ConnectSetting.isExists()) {
    createDefaultConfig();
}else {
    const connectionSetting = ConnectSetting.load();
    // プロジェクト情報が存在しない場合は取得する
    if(connectionSetting.projectInfos.length === 0){
        const projects = await firstValueFrom(Projects.Get(connectionSetting.credentialInfo));
        if (projects !== null ) {
            const projectInfos = projects.map(p => { return { 
                projectKey: p.key, 
                projectName: p.name, 
                isSync: false,
                whereCondition: `project = ${p.key}`,
                orderBy: 'updated ASC'
            } });
            connectionSetting.projectInfos = projectInfos;
            ConnectSetting.save(connectionSetting);
        }
    }else{
        await syncTicket(connectionSetting);
    }
}