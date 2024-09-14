import type { CredentialInfo } from '../connect-setting';
import { Observable, of, from } from 'rxjs';
import { Logger } from '../log/logger';

const logger = Logger.getInstance();

export function Get<T>(credentialInfo: CredentialInfo, url: string):  Observable<T | null> {
    const credentials = Buffer.from(`${credentialInfo.userName}:${credentialInfo.password}`).toString('base64');

    try {
        const result =  from(fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip'
            },
        }).then(async (response) => {
            if (!response) {
                logger.error('Error fetching: No response');
                return null;
            }
            if (!response.ok) {
                logger.error(`Error fetching: ${response.status} ${response.statusText}`);
                return null;
            }
            let response_json = await response.json();
            let castedResults = response_json as T;
    
            if (!castedResults) {
                logger.error('Error fetching: No JSON');
                return null;
            }
            return castedResults;
        }).catch((error) => {
            logger.error(`Error fetching: ${JSON.stringify(error)}`);
            return null;
        }));
        return result;
    } catch (error) {
        const errorMessage = `Error fetching: ${JSON.stringify(error)}`;
        logger.error(`Error fetching:', ${errorMessage}`);;
        return of(null);
    }
}

export function Post<T1, T2>(credentialInfo: CredentialInfo, url: string, requestBody: T2):  Observable<T1 | null> {
    const credentials = Buffer.from(`${credentialInfo.userName}:${credentialInfo.password}`).toString('base64');

    try {
        const result =  from(fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(async (response) => {
            if (!response) {
                logger.error('Error fetching: No response');
                return null;
            }
            if (!response.ok) {
                logger.error(`Error fetching: ${response.status} ${response.statusText}`);
                return null;
            }
            let response_json = await response.json();
            let castedResults = response_json as T1;
    
            if (!castedResults) {
                logger.error('Error fetching: No JSON');
                return null;
            }
            return castedResults;
        }).catch((error) => {
            logger.error(`Error fetching: ${JSON.stringify(error)}`);
            return null;
        }));
        return result;
    } catch (error) {
        const errorMessage = `Error fetching: ${JSON.stringify(error)}`;
        logger.error(`Error fetching:', ${errorMessage}`);;
        return of(null);
    }
}