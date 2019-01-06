import { BehaviorSubject } from 'rxjs';
import { Injectable, Directive, Output, HostListener, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WizardStorageService = /** @class */ (function () {
    function WizardStorageService() {
        var _this = this;
        this.subjects = {
            local: {},
            session: {},
            cookies: {}
        };
        this.session = new Object();
        this.session.isSupported = function () { return _this.isSupported(sessionStorage); };
        this.session.onchange = function (key) { return _this.onChange(key, 'session'); };
        this.session.setItem = function (key, value, version, expires) {
            _this.setItem('session', key, value, version, expires);
        };
        this.session.getItem = function (key, version) { return _this.getItem('session', key, version); };
        this.session.hasItem = function (key) { return sessionStorage.getItem(key) !== null; };
        this.session.removeItem = function (key) {
            /** @type {?} */
            var oldV = _this.subjects.session[key] ? _this.session.getItem(key) : undefined;
            sessionStorage.removeItem(key);
            if (_this.subjects.session[key]) {
                _this.subjects.session[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
        };
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
        this.local.removeItem = function (key) {
            /** @type {?} */
            var oldV = _this.subjects.local[key] ? _this.local.getItem(key) : undefined;
            localStorage.removeItem(key);
            if (_this.subjects.local[key]) {
                _this.subjects.local[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
        };
        this.local.getAllKeys = function () { return _this.getAllKeys(localStorage); };
        this.local.clear = function () { localStorage.clear(); };
        this.cookies = new Object();
        this.cookies.isSupported = function () { return true; };
        this.cookies.onchange = function (key) { return _this.onChange(key, 'cookies'); };
        this.cookies.setItem = function (key, value, expires, domain, path, isSecure) {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            /** @type {?} */
            var willExpires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            if (expires) {
                willExpires = "; max-age=" + (expires * 3600000);
            }
            /** @type {?} */
            var oldV = _this.cookies.getItem(key);
            /** @type {?} */
            var zVal = value;
            if (typeof value === 'object') {
                zVal = JSON.stringify(value);
            }
            document.cookie = encodeURIComponent(key) + "=" +
                encodeURIComponent(zVal) +
                willExpires + (domain ? "; domain=" + domain : "") +
                (path ? "; path=" + path : "") +
                (isSecure ? "; secure" : "");
            if (_this.subjects.cookies[key]) {
                _this.subjects.cookies[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: value,
                    url: document.location.href
                });
            }
            return true;
        };
        this.cookies.getItem = function (key) {
            /** @type {?} */
            var result = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
                encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            return _this.toJson(result);
        };
        this.cookies.hasItem = function (key) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        };
        this.cookies.removeItem = function (key, path, domain) {
            if (!key || !_this.cookies.hasItem(key)) {
                return false;
            }
            /** @type {?} */
            var oldV = _this.subjects.cookies[key] ? _this.cookies.getItem(key) : undefined;
            document.cookie = encodeURIComponent(key) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (domain ? "; domain=" + domain : "") +
                (path ? "; path=" + path : "");
            if (_this.subjects.cookies[key]) {
                _this.subjects.cookies[key].next({
                    key: key,
                    oldValue: oldV,
                    newValue: null,
                    url: document.location.href
                });
            }
            return true;
        };
        this.cookies.getAllKeys = function () {
            /** @type {?} */
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        };
        this.cookies.clear = function () {
            _this.cookies.getAllKeys().map(function (item) {
                _this.cookies.removeItem(item);
            });
        };
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
        /** @type {?} */
        var oldV = storage.getItem(key);
        storage.setItem(key, JSON.stringify(content));
        if (this.subjects[store][key]) {
            this.subjects[store][key].next({
                key: key,
                oldValue: oldV,
                newValue: content,
                url: document.location.href
            });
        }
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
            this.subjects[storage][key] = new BehaviorSubject(null);
        }
        return this.subjects[storage][key];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WizardStorageService.prototype.toJson = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var x = value;
        try {
            x = JSON.parse(value);
        }
        catch (e) { }
        return x;
    };
    WizardStorageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WizardStorageService.ctorParameters = function () { return []; };
    return WizardStorageService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WizardStorageDirective = /** @class */ (function () {
    function WizardStorageDirective(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    // Will listen to localStorage changes made
    // by other applications.
    /**
     * @param {?} event
     * @return {?}
     */
    WizardStorageDirective.prototype.onHover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    };
    WizardStorageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[wizardStorage]'
                },] }
    ];
    /** @nocollapse */
    WizardStorageDirective.ctorParameters = function () { return [
        { type: WizardStorageService }
    ]; };
    WizardStorageDirective.propDecorators = {
        onHover: [{ type: HostListener, args: ['window:storage', ['$event'],] }],
        wizardStorage: [{ type: Output }]
    };
    return WizardStorageDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WizardStorageModule = /** @class */ (function () {
    function WizardStorageModule() {
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

export { WizardStorageService, WizardStorageDirective, WizardStorageModule };

//# sourceMappingURL=wizard-storage.js.map