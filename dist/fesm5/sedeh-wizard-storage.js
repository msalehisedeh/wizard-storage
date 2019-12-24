import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, EventEmitter, HostListener, Output, Directive, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

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
            var willExpires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            if (expires) {
                willExpires = "; max-age=" + (expires * 3600000);
            }
            var oldV = _this.cookies.getItem(key);
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
    WizardStorageService.prototype.isSupported = function (storage) {
        try {
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
    WizardStorageService.prototype.getStorageItem = function (storage, key) {
        var result;
        try {
            result = storage.getItem(key);
            result = result ? JSON.parse(result) : { data: result };
            if (result && result.data) {
                result.data = JSON.parse(result.data);
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
    };
    WizardStorageService.prototype.getItem = function (store, key, version) {
        var storage = store === 'session' ? sessionStorage : localStorage;
        var content = this.getStorageItem(storage, key);
        var result;
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
    WizardStorageService.prototype.setItem = function (store, key, value, version, expires) {
        var storage = store === 'session' ? sessionStorage : localStorage;
        var content = { data: value };
        if (version) {
            content.version = version;
        }
        if (expires != undefined) {
            var d = new Date();
            d.setTime(d.getTime() + (expires * 3600000));
            content.expires = d.getTime();
        }
        var oldV = storage.getItem(key);
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
    };
    WizardStorageService.prototype.getAllKeys = function (storage) {
        var result = [];
        try {
            for (var i = 0; i < storage.length; i++) {
                result.push(storage.key(i));
            }
        }
        catch (e) { }
        return result;
    };
    WizardStorageService.prototype.onChange = function (key, storage) {
        if (!this.subjects[storage][key]) {
            this.subjects[storage][key] = new BehaviorSubject(null);
        }
        return this.subjects[storage][key];
    };
    WizardStorageService.prototype.toJson = function (value) {
        var x = value;
        try {
            x = JSON.parse(value);
        }
        catch (e) { }
        return x;
    };
    WizardStorageService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WizardStorageService_Factory() { return new WizardStorageService(); }, token: WizardStorageService, providedIn: "root" });
    WizardStorageService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], WizardStorageService);
    return WizardStorageService;
}());

var WizardStorageDirective = /** @class */ (function () {
    function WizardStorageDirective(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    // Will listen to localStorage changes made
    // by other applications.
    WizardStorageDirective.prototype.onHover = function (event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    };
    WizardStorageDirective.ctorParameters = function () { return [
        { type: WizardStorageService }
    ]; };
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
    return WizardStorageDirective;
}());

var WizardStorageModule = /** @class */ (function () {
    function WizardStorageModule() {
    }
    WizardStorageModule_1 = WizardStorageModule;
    WizardStorageModule.forRoot = function () {
        return {
            ngModule: WizardStorageModule_1,
            providers: [
                WizardStorageService
            ]
        };
    };
    var WizardStorageModule_1;
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
    return WizardStorageModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { WizardStorageDirective, WizardStorageModule, WizardStorageService };
//# sourceMappingURL=sedeh-wizard-storage.js.map
