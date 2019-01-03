import { CommonModule } from '@angular/common';
import { Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WizardStorageService {
    constructor() {
        this.subjects = {
            local: {},
            session: {}
        };
        this.session = new Object();
        this.session.isSupported = () => { return this.isSupported(sessionStorage); };
        this.session.onchange = (key) => { return this.onChange(key, 'session'); };
        this.session.setItem = (key, value, version, expires) => {
            this.setItem('session', key, value, version, expires);
        };
        this.session.getItem = (key, version) => { return this.getItem('session', key, version); };
        this.session.hasItem = (key) => { return sessionStorage.getItem(key) !== null; };
        this.session.removeItem = (key) => { sessionStorage.removeItem(key); };
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
        this.local.removeItem = (key) => { localStorage.removeItem(key); };
        this.local.getAllKeys = () => { return this.getAllKeys(localStorage); };
        this.local.clear = () => { localStorage.clear(); };
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
        if (this.subjects[store][key]) {
            this.subjects[store][key].next({
                key: key,
                oldValue: storage.getItem(key),
                newValue: value
            });
        }
        storage.setItem(key, JSON.stringify(content));
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
class WizardStorageModule {
}
WizardStorageModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                exports: [],
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

export { WizardStorageModule, WizardStorageService as ɵa };

//# sourceMappingURL=wizard-storage.js.map