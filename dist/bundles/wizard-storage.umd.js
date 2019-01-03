(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('wizard-storage', ['exports', '@angular/common', '@angular/core', 'rxjs'], factory) :
    (factory((global['wizard-storage'] = {}),global.ng.common,global.ng.core,global.rxjs));
}(this, (function (exports,common,core,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var WizardStorageService = (function () {
        function WizardStorageService() {
            var _this = this;
            this.subjects = {
                local: {},
                session: {}
            };
            this.session = new Object();
            this.session.isSupported = function () { return _this.isSupported(sessionStorage); };
            this.session.onchange = function (key) { return _this.onChange(key, 'session'); };
            this.session.setItem = function (key, value, version, expires) {
                _this.setItem('session', key, value, version, expires);
            };
            this.session.getItem = function (key, version) { return _this.getItem('session', key, version); };
            this.session.hasItem = function (key) { return sessionStorage.getItem(key) !== null; };
            this.session.removeItem = function (key) { sessionStorage.removeItem(key); };
            this.session.getAllKeys = function () { return _this.getAllKeys(sessionStorage); };
            this.session.clear = function () { sessionStorage.clear(); };
            this.local = new Object();
            this.local.isSupported = function () { return _this.isSupported(localStorage); };
            this.local.onchange = function (key) { return _this.onChange(key, 'local'); };
            this.local.setItem = function (key, value, version, expires) {
                _this.setItem('local', key, value, version, expires);
            };
            this.local.getItem = function (key, version) { return _this.getItem('local', key, version); };
            this.local.hasItem = function (key) { return localStorage.getItem(key) !== null; };
            this.local.removeItem = function (key) { localStorage.removeItem(key); };
            this.local.getAllKeys = function () { return _this.getAllKeys(localStorage); };
            this.local.clear = function () { localStorage.clear(); };
        }
        /**
         * @param {?} storage
         * @return {?}
         */
        WizardStorageService.prototype.isSupported = /**
         * @param {?} storage
         * @return {?}
         */
            function (storage) {
                try {
                    /** @type {?} */
                    var itemBackup = storage.getItem('');
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
            };
        /**
         * @param {?} store
         * @param {?} key
         * @param {?=} version
         * @return {?}
         */
        WizardStorageService.prototype.getItem = /**
         * @param {?} store
         * @param {?} key
         * @param {?=} version
         * @return {?}
         */
            function (store, key, version) {
                /** @type {?} */
                var storage = store === 'session' ? sessionStorage : localStorage;
                /** @type {?} */
                var item = storage.getItem(key);
                /** @type {?} */
                var content = {};
                /** @type {?} */
                var result;
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
            };
        /**
         * @param {?} store
         * @param {?} key
         * @param {?} value
         * @param {?=} version
         * @param {?=} expires
         * @return {?}
         */
        WizardStorageService.prototype.setItem = /**
         * @param {?} store
         * @param {?} key
         * @param {?} value
         * @param {?=} version
         * @param {?=} expires
         * @return {?}
         */
            function (store, key, value, version, expires) {
                /** @type {?} */
                var storage = store === 'session' ? sessionStorage : localStorage;
                /** @type {?} */
                var content = { data: value };
                if (version) {
                    content.version = version;
                }
                if (expires != undefined) {
                    /** @type {?} */
                    var d = new Date();
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
            };
        /**
         * @param {?} storage
         * @return {?}
         */
        WizardStorageService.prototype.getAllKeys = /**
         * @param {?} storage
         * @return {?}
         */
            function (storage) {
                /** @type {?} */
                var result = [];
                for (var i = 0; i < storage.length; i++) {
                    result.push(storage.key(i));
                }
                return result;
            };
        /**
         * @param {?} key
         * @param {?} storage
         * @return {?}
         */
        WizardStorageService.prototype.onChange = /**
         * @param {?} key
         * @param {?} storage
         * @return {?}
         */
            function (key, storage) {
                if (!this.subjects[storage][key]) {
                    this.subjects[storage][key] = new rxjs.BehaviorSubject(null);
                }
                return this.subjects[storage][key];
            };
        WizardStorageService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        WizardStorageService.ctorParameters = function () { return []; };
        return WizardStorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var WizardStorageModule = (function () {
        function WizardStorageModule() {
        }
        WizardStorageModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        exports: [],
                        imports: [
                            common.CommonModule
                        ],
                        providers: [
                            WizardStorageService
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return WizardStorageModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.WizardStorageModule = WizardStorageModule;
    exports.ɵa = WizardStorageService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=wizard-storage.umd.js.map