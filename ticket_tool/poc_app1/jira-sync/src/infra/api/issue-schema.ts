import { type CredentialInfo } from "../connect-setting";
import { Get } from "./http-common";

const JIRA_API_ENDPOINT_FIELD = '/rest/api/3/field';
const JIRA_API_ENDPOINT_ISSUE_TYPE = '/rest/api/3/issuetype';
const JIRA_API_ENDPOINT_PRIORITY = '/rest/api/3/priority';
const JIRA_API_ENDPOINT_PROJECT = '/rest/api/3/project';
const JIRA_API_ENDPOINT_STATUS = '/rest/api/3/statuscategory';
const JIRA_API_ENDPOINT_USER = '/rest/api/3/users/search?startAt=0&maxResults=1000';
const JIRA_API_ENDPOINT_USER2 = '/rest/api/3/users/search?startAt=1000&maxResults=1000';
const JIRA_API_ENDPOINT_USER3 = '/rest/api/3/users/search?startAt=2000&maxResults=1000';
const JIRA_API_ENDPOINT_USER4 = '/rest/api/3/users/search?startAt=3000&maxResults=1000';
const JIRA_API_ENDPOINT_USER5 = '/rest/api/3/users/search?startAt=4000&maxResults=1000';


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

export type IssueType = {
    expand: string,
    self: string,
    id: number
    key: string,
    name: string,
    avatarUrls_48x48: string,
    avatarUrls_24x24: string,
    avatarUrls_16x16: string ,
    avatarUrls_32x32: string,
    projectTypeKey: string,
    simplified: boolean,
    style: string,
    isPrivate: boolean,
    properties: object
    entityId: string,
    uuid: string,
}

export const IssueType = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_ISSUE_TYPE}`;
        const response = Get<object[]>(credential, url);
        return response;
    }
}

export const Priority = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_PRIORITY}`;
        const response = Get<object[]>(credential, url);
        return response;
    }
}

export const Project = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_PROJECT}`;
        const response = Get<object[]>(credential, url);
        return response;
    }
}

export const User = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_USER}`;
        const response = Get<object[]>(credential, url);
        return response;
    },
    Get2: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_USER2}`;
        const response = Get<object[]>(credential, url);
        return response;
    },
    Get3: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_USER3}`;
        const response = Get<object[]>(credential, url);
        return response;
    },
    Get4: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_USER4}`;
        const response = Get<object[]>(credential, url);
        return response;
    },
    Get5: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_USER5}`;
        const response = Get<object[]>(credential, url);
        return response;
    }
}

export const Status = {
    Get: (credential: CredentialInfo) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT_STATUS}`;
        const response = Get<object[]>(credential, url);
        return response;
    }
}