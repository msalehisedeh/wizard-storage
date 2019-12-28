(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/wizard-storage', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['wizard-storage'] = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            this.session.setItem = function (key, value, version, expires, isSecure) {
                _this.setItem('session', key, value, version, expires, isSecure);
            };
            this.session.getItem = function (key, options) { return _this.getItem('session', key, options); };
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
            this.local.setItem = function (key, value, version, expires, isSecure) {
                _this.setItem('local', key, value, version, expires, isSecure);
            };
            this.local.getItem = function (key, options) { return _this.getItem('local', key, options); };
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
        WizardStorageService.prototype.encode = function (value) {
            var x = JSON.stringify({ secured: value });
            return btoa(encodeURIComponent(x).split('').reverse().join(''));
        };
        WizardStorageService.prototype.decode = function (value) {
            var x = decodeURIComponent(atob(value).split('').reverse().join(''));
            return JSON.parse(x).secured;
        };
        WizardStorageService.prototype.getStorageItem = function (storage, key, options) {
            var result;
            try {
                result = storage.getItem(key);
                if (result) {
                    result = JSON.parse(result);
                    result.data = options.isSecure ? this.decode(result.data) : result.data;
                }
                else if (options && options.default) {
                    var value = options.isSecure ? this.encode(options.default) : options.default;
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
        };
        WizardStorageService.prototype.getItem = function (store, key, options) {
            var storage = store === 'session' ? sessionStorage : localStorage;
            var version = (typeof options === 'string') ? options : (options ? options.version : undefined);
            var content = this.getStorageItem(storage, key, options);
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
        WizardStorageService.prototype.setItem = function (store, key, value, version, expires, isSecure) {
            var storage = store === 'session' ? sessionStorage : localStorage;
            var coded = isSecure ? this.encode(value) : value;
            var content = { data: coded };
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
                this.subjects[storage][key] = new rxjs.BehaviorSubject(null);
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
        WizardStorageService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WizardStorageService_Factory() { return new WizardStorageService(); }, token: WizardStorageService, providedIn: "root" });
        WizardStorageService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], WizardStorageService);
        return WizardStorageService;
    }());

    var WizardStorageDirective = /** @class */ (function () {
        function WizardStorageDirective(wizardService) {
            this.wizardService = wizardService;
            this.wizardStorage = new core.EventEmitter();
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
            core.HostListener('window:storage', ['$event'])
        ], WizardStorageDirective.prototype, "onHover", null);
        __decorate([
            core.Output()
        ], WizardStorageDirective.prototype, "wizardStorage", void 0);
        WizardStorageDirective = __decorate([
            core.Directive({
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
            core.NgModule({
                declarations: [
                    WizardStorageDirective
                ],
                exports: [
                    WizardStorageDirective
                ],
                imports: [
                    common.CommonModule
                ],
                providers: [
                    WizardStorageService
                ],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], WizardStorageModule);
        return WizardStorageModule;
    }());

    exports.WizardStorageDirective = WizardStorageDirective;
    exports.WizardStorageModule = WizardStorageModule;
    exports.WizardStorageService = WizardStorageService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-wizard-storage.umd.js.map
