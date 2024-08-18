import { ConnectSetting, type CredentialInfo } from "../connect-setting";
import { Get } from "./http-common";

const JIRA_API_ENDPOINT_FIELD = '/rest/api/3/project';

export type Project = {
    id: string,
    key: string,
    name: string,
    untranslatedName: string,
}

export const Projects = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_FIELD}`;
        const response = Get<Project[]>(credential, url);
        return response;
    }
}
