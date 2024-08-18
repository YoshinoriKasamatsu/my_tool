import { type CredentialInfo } from "../connect-setting";
import { Get } from "./http-common";

const JIRA_API_ENDPOINT_FIELD = '/rest/api/3/field';

export type Field = {
    id: string,
    key: string,
    name: string,
    untranslatedName: string,
    custom: boolean,
    orderable: boolean,
    navigable: boolean,
    searchable: boolean,
    clauseNames: string[],
    schema: {
      type: string,
      custom: string,
      customId: number,
    },
}

export const Field = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_FIELD}`;
        const response = Get<Field[]>(credential, url);
        return response;
    }
}
