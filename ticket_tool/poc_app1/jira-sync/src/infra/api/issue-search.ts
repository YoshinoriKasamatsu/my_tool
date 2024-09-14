import type { CredentialInfo } from '../connect-setting';
import { Get, Post } from './http-common';

const JIRA_API_ENDPOINT = '/rest/api/3/search';

export type Issue = {
    key: string,
    id: string,
    expand: string,
    self: string,
    changelog: {
        histories: {
            id: string,
            created: string,
            items: {
                field: string,
                fieldtype: string,
                from: string,
                fromString: string,
                to: string,
                toString: string
            }[]
    }[]},
    fields: {
    },
    // fields: {
    //     summary: string,
    //     status: {
    //         name: string,
    //         statusCategory: {
    //             key: string,
    //             name: string
    //         }
    //     },
    //     updated: string,
    //     assignee: {
    //         name: string
    //     }
    // }
}

export type SearchReults = {
    issues: Issue[];
    maxResults: number,
    startAt: number,
    total: number,
}

export type SearchRequest = {
    jql: string,
    startAt: number,
    maxResults: number,
    fields: string[],
    expand: string[]
}

export type Fields = {
    summary: string,
    status: {
        name: string,
        statusCategory: {
            key: string,
            name: string
        }
    },
    updated: string,
    assignee: {
        name: string
    }
}

export const IssueSearch = {
    Get: (
        credential: CredentialInfo,
        jql: string,
        startAt: number = 0,
        maxResults: number = 50,
        fields: string[] = ['summary', 'status', 'updated', 'assignee'],
        expand: string[] = ['changelog']
    ) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT}/?jql=${jql}&startAt=${startAt}&maxResults=${maxResults}&fields=${fields.join(',')}&expand=${expand.join(',')}`;
        const response = Get<SearchReults>(credential, url);
        return response;
    },
    Post: (credential: CredentialInfo, requestBody: SearchRequest) => {
        const url = `${credential.endPoint}${JIRA_API_ENDPOINT}`;
        const response = Post<SearchReults, SearchRequest>(credential, url, requestBody);
        return response;
    }
}
