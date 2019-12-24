
/*
* WizardStorage provides an easy way to use web storage capabilities of modern web browsers.
*
* reference to browser compatibilities.
* https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#Browser_compatibility
* https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage#Browser_compatibility
*/
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WizardStorageService {

    public local: any;
    public session: any;
    public cookies: any;

    private subjects = {
        local: {},
        session: {},
        cookies: {}
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
    private getStorageItem(storage: any, key: string) {
        let result: any;
        try {
            result = storage.getItem(key);
            result = result ? JSON.parse(result): {data: result};
            if (result && result.data) {
                result.data = JSON.parse(result.data);
            }
        } catch(e) {
            if (result && !result.data) {
                result = {
                    data: result
                };
            }
        }
        return result;
    }
    private getItem(store: string, key: string, version?: string) {
        const storage: any = store === 'session' ? sessionStorage : localStorage
        let content: any = this.getStorageItem(storage, key);
        let result: any;

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
                storage.removeItem(key);
                if (this.subjects[store][key]) {
                    this.subjects[store][key].next({
                        key: key,
                        oldValue: content,
                        newValue: null,
                        url: document.location.href
                    });
                }
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
        const oldV = storage.getItem(key);
        try {
            storage.setItem(key, JSON.stringify(content));
            if (this.subjects[store][key]) {
                this.subjects[store][key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: content,
                    url: document.location.href
                });
            }
        } catch(e){}
    }
    private getAllKeys(storage: any) {
        const result = [];
        try {
            for(let i = 0; i < storage.length; i++) {
                result.push(storage.key( i ));
            }
        } catch(e){}
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
        this.session.removeItem = (key: string) => {
            const oldV = this.subjects.session[key] ? this.session.getItem(key): undefined;
            sessionStorage.removeItem(key);
            if (this.subjects.session[key]) {
                this.subjects.session[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
        };
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
        this.local.removeItem = (key: string) => {
            const oldV = this.subjects.local[key] ? this.local.getItem(key): undefined;
            localStorage.removeItem(key)
            if (this.subjects.local[key]) {
                this.subjects.local[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
        };
        this.local.getAllKeys = () => {return this.getAllKeys(localStorage)};
        this.local.clear = () => {localStorage.clear()};

        this.cookies =  new Object();
        this.cookies.isSupported = () => {return true;};
        this.cookies.onchange = (key: string) => {return this.onChange(key, 'cookies')}
        this.cookies.setItem = (key: string, value: any, expires?: number, domain?: string, path?: string, isSecure?: boolean) => {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            let willExpires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            if (expires) {
                willExpires = "; max-age=" + (expires*3600000);
            }
            const oldV = this.cookies.getItem(key);
            let zVal = value;
            if (typeof value === 'object'){
                zVal = JSON.stringify(value);
            }
            document.cookie = encodeURIComponent(key) + "=" +
                              encodeURIComponent(zVal) +
                              willExpires + (domain ? "; domain=" + domain : "") +
                              (path ? "; path=" + path : "") +
                              (isSecure ? "; secure" : "");
            if (this.subjects.cookies[key]) {
                this.subjects.cookies[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: value,
                    url: document.location.href
                });
            }
            return true;
        };
        this.cookies.getItem = (key: string) => {
            const result = decodeURIComponent(
                document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
                encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            return this.toJson(result);
        };
        this.cookies.hasItem = (key: string) => {
            return (
                new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")
            ).test(document.cookie);
        };
        this.cookies.removeItem = (key: string, path?: string, domain?: string) => {
            if (!key || !this.cookies.hasItem(key)) {
                return false;
            }
            const oldV = this.subjects.cookies[key] ? this.cookies.getItem(key): undefined;
            document.cookie = encodeURIComponent(key) +
                            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                            ( domain ? "; domain=" + domain : "") +
                            ( path ? "; path=" + path : "");
            if (this.subjects.cookies[key]) {
                this.subjects.cookies[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
            return true;
        };
        this.cookies.getAllKeys = () => {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        };
        this.cookies.clear = () => {
            this.cookies.getAllKeys().map(
                (item: string) => {
                    this.cookies.removeItem(item);
                }
            );
        }
    }

    toJson(value: any) {
        let x = value;
        try {
            x = JSON.parse(value);
        }catch(e){}
        return x;
    }
}
