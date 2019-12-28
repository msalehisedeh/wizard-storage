import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, EventEmitter, HostListener, Output, Directive, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

let WizardStorageService = class WizardStorageService {
    constructor() {
        this.subjects = {
            local: {},
            session: {},
            cookies: {}
        };
        this.session = new Object();
        this.session.isSupported = () => { return this.isSupported(sessionStorage); };
        this.session.onchange = (key) => { return this.onChange(key, 'session'); };
        this.session.setItem = (key, value, version, expires, isSecure) => {
            this.setItem('session', key, value, version, expires, isSecure);
        };
        this.session.getItem = (key, options) => { return this.getItem('session', key, options); };
        this.session.hasItem = (key) => { return sessionStorage.getItem(key) !== null; };
        this.session.removeItem = (key) => {
            const oldV = this.subjects.session[key] ? this.session.getItem(key) : undefined;
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
        this.session.getAllKeys = () => { return this.getAllKeys(sessionStorage); };
        this.session.clear = () => { sessionStorage.clear(); };
        this.local = new Object();
        this.local.isSupported = () => { return this.isSupported(localStorage); };
        this.local.onchange = (key) => { return this.onChange(key, 'local'); };
        this.local.setItem = (key, value, version, expires, isSecure) => {
            this.setItem('local', key, value, version, expires, isSecure);
        };
        this.local.getItem = (key, options) => { return this.getItem('local', key, options); };
        this.local.hasItem = (key) => { return localStorage.getItem(key) !== null; };
        this.local.removeItem = (key) => {
            const oldV = this.subjects.local[key] ? this.local.getItem(key) : undefined;
            localStorage.removeItem(key);
            if (this.subjects.local[key]) {
                this.subjects.local[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
        };
        this.local.getAllKeys = () => { return this.getAllKeys(localStorage); };
        this.local.clear = () => { localStorage.clear(); };
        this.cookies = new Object();
        this.cookies.isSupported = () => { return true; };
        this.cookies.onchange = (key) => { return this.onChange(key, 'cookies'); };
        this.cookies.setItem = (key, value, expires, domain, path, isSecure) => {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            let willExpires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            if (expires) {
                willExpires = "; max-age=" + (expires * 3600000);
            }
            const oldV = this.cookies.getItem(key);
            let zVal = value;
            if (typeof value === 'object') {
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
        this.cookies.getItem = (key) => {
            const result = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
                encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            return this.toJson(result);
        };
        this.cookies.hasItem = (key) => {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        };
        this.cookies.removeItem = (key, path, domain) => {
            if (!key || !this.cookies.hasItem(key)) {
                return false;
            }
            const oldV = this.subjects.cookies[key] ? this.cookies.getItem(key) : undefined;
            document.cookie = encodeURIComponent(key) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (domain ? "; domain=" + domain : "") +
                (path ? "; path=" + path : "");
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
            this.cookies.getAllKeys().map((item) => {
                this.cookies.removeItem(item);
            });
        };
    }
    isSupported(storage) {
        try {
            const itemBackup = storage.getItem('');
            storage.removeItem('');
            storage.setItem('', itemBackup);
            if (itemBackup === null) {
                storage.removeItem('');
            }
            else {
                storage.setItem('', itemBackup);
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    encode(value) {
        const x = JSON.stringify({ secured: value });
        return btoa(encodeURIComponent(x).split('').reverse().join(''));
    }
    decode(value) {
        const x = decodeURIComponent(atob(value).split('').reverse().join(''));
        return JSON.parse(x).secured;
    }
    getStorageItem(storage, key, options) {
        let result;
        try {
            result = storage.getItem(key);
            if (result) {
                result = JSON.parse(result);
                result.data = options.isSecure ? this.decode(result.data) : result.data;
            }
            else if (options && options.default) {
                const value = options.isSecure ? this.encode(options.default) : options.default;
                storage.setItem(key, JSON.stringify({ data: value }));
                result = { data: options.default };
            }
            else {
                result = { data: undefined };
            }
        }
        catch (e) {
            if (result && !result.data) {
                result = {
                    data: result
                };
            }
        }
        return result;
    }
    getItem(store, key, options) {
        const storage = store === 'session' ? sessionStorage : localStorage;
        const version = (typeof options === 'string') ? options : (options ? options.version : undefined);
        let content = this.getStorageItem(storage, key, options);
        let result;
        if (version && content.version) {
            if (version == content.version) {
                result = content.data;
            }
            else {
                result = undefined;
            }
        }
        else {
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
    setItem(store, key, value, version, expires, isSecure) {
        const storage = store === 'session' ? sessionStorage : localStorage;
        const coded = isSecure ? this.encode(value) : value;
        const content = { data: coded };
        if (version) {
            content.version = version;
        }
        if (expires != undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (expires * 3600000));
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
        }
        catch (e) { }
    }
    getAllKeys(storage) {
        const result = [];
        try {
            for (let i = 0; i < storage.length; i++) {
                result.push(storage.key(i));
            }
        }
        catch (e) { }
        return result;
    }
    onChange(key, storage) {
        if (!this.subjects[storage][key]) {
            this.subjects[storage][key] = new BehaviorSubject(null);
        }
        return this.subjects[storage][key];
    }
    toJson(value) {
        let x = value;
        try {
            x = JSON.parse(value);
        }
        catch (e) { }
        return x;
    }
};
WizardStorageService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WizardStorageService_Factory() { return new WizardStorageService(); }, token: WizardStorageService, providedIn: "root" });
WizardStorageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WizardStorageService);

let WizardStorageDirective = class WizardStorageDirective {
    constructor(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    // Will listen to localStorage changes made
    // by other applications.
    onHover(event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    }
};
WizardStorageDirective.ctorParameters = () => [
    { type: WizardStorageService }
];
__decorate([
    HostListener('window:storage', ['$event'])
], WizardStorageDirective.prototype, "onHover", null);
__decorate([
    Output()
], WizardStorageDirective.prototype, "wizardStorage", void 0);
WizardStorageDirective = __decorate([
    Directive({
        selector: '[wizardStorage]'
    })
], WizardStorageDirective);

var WizardStorageModule_1;
let WizardStorageModule = WizardStorageModule_1 = class WizardStorageModule {
    static forRoot() {
        return {
            ngModule: WizardStorageModule_1,
            providers: [
                WizardStorageService
            ]
        };
    }
};
WizardStorageModule = WizardStorageModule_1 = __decorate([
    NgModule({
        declarations: [
            WizardStorageDirective
        ],
        exports: [
            WizardStorageDirective
        ],
        imports: [
            CommonModule
        ],
        providers: [
            WizardStorageService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], WizardStorageModule);

/**
 * Generated bundle index. Do not edit.
 */

export { WizardStorageDirective, WizardStorageModule, WizardStorageService };
//# sourceMappingURL=sedeh-wizard-storage.js.map
