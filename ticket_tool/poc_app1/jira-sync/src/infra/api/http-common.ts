import type { CredentialInfo } from '../connect-setting';
import { Observable, of, from } from 'rxjs';

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
                return null;
            }
            if (!response.ok) {
                console.error('Error fetching:', response.status, response.statusText);
                return null;
            }
            let response_json = await response.json();
            let castedResults = response_json as T;
    
            if (!castedResults) {
                return null;
            }
            return castedResults;
        }));        
        return result;
    } catch (error) {
        console.error('Error fetching:', error);
        return of(null);
    }
}