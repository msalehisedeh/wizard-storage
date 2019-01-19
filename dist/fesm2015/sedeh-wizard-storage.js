import { BehaviorSubject } from 'rxjs';
import { Injectable, Directive, Output, HostListener, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WizardStorageService {
    constructor() {
        this.subjects = {
            local: {},
            session: {},
            cookies: {}
        };
        this.session = new Object();
        this.session.isSupported = () => { return this.isSupported(sessionStorage); };
        this.session.onchange = (key) => { return this.onChange(key, 'session'); };
        this.session.setItem = (key, value, version, expires) => {
            this.setItem('session', key, value, version, expires);
        };
        this.session.getItem = (key, version) => { return this.getItem('session', key, version); };
        this.session.hasItem = (key) => { return sessionStorage.getItem(key) !== null; };
        this.session.removeItem = (key) => {
            /** @type {?} */
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
        this.local.setItem = (key, value, version, expires) => {
            this.setItem('local', key, value, version, expires);
        };
        this.local.getItem = (key, version) => { return this.getItem('local', key, version); };
        this.local.hasItem = (key) => { return localStorage.getItem(key) !== null; };
        this.local.removeItem = (key) => {
            /** @type {?} */
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
            /** @type {?} */
            let willExpires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            if (expires) {
                willExpires = "; max-age=" + (expires * 3600000);
            }
            /** @type {?} */
            const oldV = this.cookies.getItem(key);
            /** @type {?} */
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
            /** @type {?} */
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
            /** @type {?} */
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
            /** @type {?} */
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
    /**
     * @param {?} storage
     * @return {?}
     */
    isSupported(storage) {
        try {
            /** @type {?} */
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
    /**
     * @param {?} store
     * @param {?} key
     * @param {?=} version
     * @return {?}
     */
    getItem(store, key, version) {
        /** @type {?} */
        const storage = store === 'session' ? sessionStorage : localStorage;
        /** @type {?} */
        const item = storage.getItem(key);
        /** @type {?} */
        let content = {};
        /** @type {?} */
        let result;
        if (item) {
            try {
                content = JSON.parse(item);
            }
            catch (e) {
                content = {
                    data: item
                };
            }
        }
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
    /**
     * @param {?} store
     * @param {?} key
     * @param {?} value
     * @param {?=} version
     * @param {?=} expires
     * @return {?}
     */
    setItem(store, key, value, version, expires) {
        /** @type {?} */
        const storage = store === 'session' ? sessionStorage : localStorage;
        /** @type {?} */
        const content = { data: value };
        if (version) {
            content.version = version;
        }
        if (expires != undefined) {
            /** @type {?} */
            const d = new Date();
            d.setTime(d.getTime() + (expires * 3600000));
            content.expires = d.getTime();
        }
        /** @type {?} */
        const oldV = storage.getItem(key);
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
    /**
     * @param {?} storage
     * @return {?}
     */
    getAllKeys(storage) {
        /** @type {?} */
        const result = [];
        for (let i = 0; i < storage.length; i++) {
            result.push(storage.key(i));
        }
        return result;
    }
    /**
     * @param {?} key
     * @param {?} storage
     * @return {?}
     */
    onChange(key, storage) {
        if (!this.subjects[storage][key]) {
            this.subjects[storage][key] = new BehaviorSubject(null);
        }
        return this.subjects[storage][key];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toJson(value) {
        /** @type {?} */
        let x = value;
        try {
            x = JSON.parse(value);
        }
        catch (e) { }
        return x;
    }
}
WizardStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WizardStorageService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WizardStorageDirective {
    /**
     * @param {?} wizardService
     */
    constructor(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onHover(event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    }
}
WizardStorageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wizardStorage]'
            },] }
];
/** @nocollapse */
WizardStorageDirective.ctorParameters = () => [
    { type: WizardStorageService }
];
WizardStorageDirective.propDecorators = {
    onHover: [{ type: HostListener, args: ['window:storage', ['$event'],] }],
    wizardStorage: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WizardStorageModule {
}
WizardStorageModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { WizardStorageService, WizardStorageDirective, WizardStorageModule };

//# sourceMappingURL=sedeh-wizard-storage.js.map