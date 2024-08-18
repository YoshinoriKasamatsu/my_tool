import { firstValueFrom } from "rxjs";
import type { ConnectSetting } from "../connect-setting";
import * as fs from 'fs';
import * as Path from 'path';
import { DATA_DIR, FIELDS_FILE_PATH } from "../const-definitions";
import { IssueSearch } from "../api/issue-search";


export const ProjectsData = {
    SyncData: async (connectionSetting: ConnectSetting) => {
        // isSyncがtrueのプロジェクトのみ処理を行う
        const syncProjects = connectionSetting.projectInfos.filter(p => p.isSync);
        for (const project of syncProjects) {
            const project_dir = Path.join(DATA_DIR, project.projectKey);
            if (!fs.existsSync(project_dir)) {
                fs.mkdirSync(project_dir, { recursive: true });
            }
            const fields = ['*all'];
            const jql = `project = ${project.projectKey} AND status = "To Do"`;
            const issues = await firstValueFrom(IssueSearch.Get(connectionSetting.credentialInfo, jql, 0, 10, fields));
            if(issues === null){
                continue;
            }
            for (const issue of issues.issues) {
                const issueFilePath = Path.join(project_dir, `${issue.key}.json`);
                fs.writeFileSync(issueFilePath, JSON.stringify(issue), 'utf8');
            }
        }
    }
}