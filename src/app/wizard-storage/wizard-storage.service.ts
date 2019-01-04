
/*
* WizardStorage provides an easy way to use web storage capabilities of modern web browsers.
*
* reference to browser compatibilities.
* https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#Browser_compatibility
* https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage#Browser_compatibility
*/
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class WizardStorageService {

    public local: any;
    public session: any;
    private subjects = {
        local: {},
        session: {}
    };

    private isSupported(storage: any) {
        try {
            const itemBackup = storage.getItem('');
            storage.removeItem('');
            storage.setItem('', itemBackup);
            if (itemBackup === null) {
                storage.removeItem('');
            } else {
                storage.setItem('', itemBackup);
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    private getItem(store: string, key: string, version?: string) {
        const storage: any = store === 'session' ? sessionStorage : localStorage
        const item = storage.getItem(key);
        let content: any = {};
        let result: any;

        if (item) {
            try {
                content = JSON.parse(item);
            } catch (e) {
                content = {
                    data: item
                };
            }
        }

        if (version && content.version) {
            if (version == content.version) {
                result = content.data;
            } else {
                result = undefined;
            }
        } else {
            result = content.data;
        }
        if (result && content.expires) {
            if (new Date().getTime() >= content.expires) {
                if (this.subjects[store][key]) {
                    this.subjects[store][key].next({
                        key: key,
                        oldValue: result,
                        newValue: null
                    });
                }
                storage.removeItem(key);
                result = undefined;
            }
        }
        return result;
    }
    private setItem(store: string, key: string, value: any, version?: string, expires?: number) {
        const storage: any = store === 'session' ? sessionStorage : localStorage
        const content: any = {data: value};

        if (version) {
            content.version = version;
        }
        if (expires != undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (expires*3600000)); 
            content.expires = d.getTime();
        }
        if (this.subjects[store][key]) {
            this.subjects[store][key].next({
                key: key,
                oldValue: storage.getItem(key),
                newValue: value
            });
        }
        storage.setItem(key, JSON.stringify(content));
    }
    private getAllKeys(storage: any) {
        const result = [];
        for(let i = 0; i < storage.length; i++) {
            result.push(storage.key( i ));
        }
        return result;
    }
    private onChange(key: string, storage: string) {
        if (!this.subjects[storage][key]) {
            this.subjects[storage][key] = new BehaviorSubject<any>(null);
        }
        return this.subjects[storage][key];
    }

    constructor() {

        this.session = new Object();
        this.session.isSupported = () => {return this.isSupported(sessionStorage)};
        this.session.onchange = (key: string) => {return this.onChange(key, 'session')}
        this.session.setItem = (key: string, value: any, version?: string, expires?: number) => {
            this.setItem('session', key, value, version, expires);
        };
        this.session.getItem = (key: string, version?: string) => {return this.getItem('session', key, version)};
        this.session.hasItem = (key: string) => {return sessionStorage.getItem(key) !== null};
        this.session.removeItem = (key: string) => {sessionStorage.removeItem(key)};
        this.session.getAllKeys = () => {return this.getAllKeys(sessionStorage)};
        this.session.clear = () => { sessionStorage.clear()};

        
        this.local = new Object();
        this.local.isSupported = () => {return this.isSupported(localStorage)};
        this.local.onchange = (key: string) => {return this.onChange(key, 'local')}
        this.local.setItem = (key: string, value: any, version?: string, expires?: number) => {
            this.setItem('local', key, value,version, expires);
        };
        this.local.getItem = (key: string, version?: string) => {return this.getItem('local', key, version)};
        this.local.hasItem = (key: string) => {return localStorage.getItem(key) !== null};
        this.local.removeItem = (key: string) => {localStorage.removeItem(key)};
        this.local.getAllKeys = () => {return this.getAllKeys(localStorage)};
        this.local.clear = () => {localStorage.clear()};
    }
}
