/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
export { WizardStorageService };
if (false) {
    /** @type {?} */
    WizardStorageService.prototype.local;
    /** @type {?} */
    WizardStorageService.prototype.session;
    /** @type {?} */
    WizardStorageService.prototype.cookies;
    /** @type {?} */
    WizardStorageService.prototype.subjects;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7O0lBNkdqQztRQUFBLGlCQTZIQzt3QkFqT2tCO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFrR0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGNBQU8sTUFBTSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUEsRUFBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFVBQUMsR0FBVyxJQUFNLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQSxFQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBQyxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0I7WUFDL0UsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekQsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLE9BQWdCLElBQU0sTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FB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QVEsQ0FBQyxJQUFJO2FBQzlCLENBQUMsQ0FBQztTQUNOOzs7Ozs7SUFFRyx5Q0FBVTs7OztjQUFDLE9BQVk7O1FBQzNCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztTQUNqQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7SUFFVix1Q0FBUTs7Ozs7Y0FBQyxHQUFXLEVBQUUsT0FBZTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7U0FDaEU7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBa0l2QyxxQ0FBTTs7OztJQUFOLFVBQU8sS0FBVTs7UUFDYixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDZCxJQUFJLENBQUM7WUFDRCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtRQUFBLEtBQUssQ0FBQSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7UUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7O2dCQWhQSixVQUFVOzs7OytCQVhYOztTQVlhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKlxyXG4qIFdpemFyZFN0b3JhZ2UgcHJvdmlkZXMgYW4gZWFzeSB3YXkgdG8gdXNlIHdlYiBzdG9yYWdlIGNhcGFiaWxpdGllcyBvZiBtb2Rlcm4gd2ViIGJyb3dzZXJzLlxyXG4qXHJcbiogcmVmZXJlbmNlIHRvIGJyb3dzZXIgY29tcGF0aWJpbGl0aWVzLlxyXG4qIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvbG9jYWxTdG9yYWdlI0Jyb3dzZXJfY29tcGF0aWJpbGl0eVxyXG4qIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvc2Vzc2lvblN0b3JhZ2UjQnJvd3Nlcl9jb21wYXRpYmlsaXR5XHJcbiovXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFdpemFyZFN0b3JhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgbG9jYWw6IGFueTtcclxuICAgIHB1YmxpYyBzZXNzaW9uOiBhbnk7XHJcbiAgICBwdWJsaWMgY29va2llczogYW55O1xyXG5cclxuICAgIHByaXZhdGUgc3ViamVjdHMgPSB7XHJcbiAgICAgICAgbG9jYWw6IHt9LFxyXG4gICAgICAgIHNlc3Npb246IHt9LFxyXG4gICAgICAgIGNvb2tpZXM6IHt9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaXNTdXBwb3J0ZWQoc3RvcmFnZTogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUJhY2t1cCA9IHN0b3JhZ2UuZ2V0SXRlbSgnJyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgnJyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSgnJywgaXRlbUJhY2t1cCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQmFja3VwID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCcnLCBpdGVtQmFja3VwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0SXRlbShzdG9yZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2U6IGFueSA9IHN0b3JlID09PSAnc2Vzc2lvbicgPyBzZXNzaW9uU3RvcmFnZSA6IGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBsZXQgY29udGVudDogYW55ID0ge307XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55O1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaXRlbVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZlcnNpb24gJiYgY29udGVudC52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uID09IGNvbnRlbnQudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY29udGVudC5kYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY29udGVudC5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0ICYmIGNvbnRlbnQuZXhwaXJlcykge1xyXG4gICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgPj0gY29udGVudC5leHBpcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzW3N0b3JlXVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0SXRlbShzdG9yZTogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgdmVyc2lvbj86IHN0cmluZywgZXhwaXJlcz86IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2U6IGFueSA9IHN0b3JlID09PSAnc2Vzc2lvbicgPyBzZXNzaW9uU3RvcmFnZSA6IGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ6IGFueSA9IHtkYXRhOiB2YWx1ZX07XHJcblxyXG4gICAgICAgIGlmICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQudmVyc2lvbiA9IHZlcnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChleHBpcmVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKGV4cGlyZXMqMzYwMDAwMCkpOyBcclxuICAgICAgICAgICAgY29udGVudC5leHBpcmVzID0gZC5nZXRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZFYgPSBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShjb250ZW50KSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3ViamVjdHNbc3RvcmVdW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFYsXHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogY29udGVudCxcclxuICAgICAgICAgICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEFsbEtleXMoc3RvcmFnZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goc3RvcmFnZS5rZXkoIGkgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlKGtleTogc3RyaW5nLCBzdG9yYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3ViamVjdHNbc3RvcmFnZV1ba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YmplY3RzW3N0b3JhZ2VdW2tleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3RzW3N0b3JhZ2VdW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uaXNTdXBwb3J0ZWQgPSAoKSA9PiB7cmV0dXJuIHRoaXMuaXNTdXBwb3J0ZWQoc2Vzc2lvblN0b3JhZ2UpfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24ub25jaGFuZ2UgPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gdGhpcy5vbkNoYW5nZShrZXksICdzZXNzaW9uJyl9XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLnNldEl0ZW0gPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHZlcnNpb24/OiBzdHJpbmcsIGV4cGlyZXM/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJdGVtKCdzZXNzaW9uJywga2V5LCB2YWx1ZSwgdmVyc2lvbiwgZXhwaXJlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uZ2V0SXRlbSA9IChrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykgPT4ge3JldHVybiB0aGlzLmdldEl0ZW0oJ3Nlc3Npb24nLCBrZXksIHZlcnNpb24pfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uaGFzSXRlbSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkgIT09IG51bGx9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZW1vdmVJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFYgPSB0aGlzLnN1YmplY3RzLnNlc3Npb25ba2V5XSA/IHRoaXMuc2Vzc2lvbi5nZXRJdGVtKGtleSk6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0cy5zZXNzaW9uW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHMuc2Vzc2lvbltrZXldLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMoc2Vzc2lvblN0b3JhZ2UpfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uY2xlYXIgPSAoKSA9PiB7IHNlc3Npb25TdG9yYWdlLmNsZWFyKCl9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvY2FsID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMubG9jYWwuaXNTdXBwb3J0ZWQgPSAoKSA9PiB7cmV0dXJuIHRoaXMuaXNTdXBwb3J0ZWQobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5vbmNoYW5nZSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiB0aGlzLm9uQ2hhbmdlKGtleSwgJ2xvY2FsJyl9XHJcbiAgICAgICAgdGhpcy5sb2NhbC5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SXRlbSgnbG9jYWwnLCBrZXksIHZhbHVlLHZlcnNpb24sIGV4cGlyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRJdGVtID0gKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMuZ2V0SXRlbSgnbG9jYWwnLCBrZXksIHZlcnNpb24pfTtcclxuICAgICAgICB0aGlzLmxvY2FsLmhhc0l0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5yZW1vdmVJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFYgPSB0aGlzLnN1YmplY3RzLmxvY2FsW2tleV0gPyB0aGlzLmxvY2FsLmdldEl0ZW0oa2V5KTogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzLmxvY2FsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHMubG9jYWxba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVixcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmxvY2FsLmdldEFsbEtleXMgPSAoKSA9PiB7cmV0dXJuIHRoaXMuZ2V0QWxsS2V5cyhsb2NhbFN0b3JhZ2UpfTtcclxuICAgICAgICB0aGlzLmxvY2FsLmNsZWFyID0gKCkgPT4ge2xvY2FsU3RvcmFnZS5jbGVhcigpfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb29raWVzID0gIG5ldyBPYmplY3QoKTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMuaXNTdXBwb3J0ZWQgPSAoKSA9PiB7cmV0dXJuIHRydWU7fTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMub25jaGFuZ2UgPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gdGhpcy5vbkNoYW5nZShrZXksICdjb29raWVzJyl9XHJcbiAgICAgICAgdGhpcy5jb29raWVzLnNldEl0ZW0gPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBudW1iZXIsIGRvbWFpbj86IHN0cmluZywgcGF0aD86IHN0cmluZywgaXNTZWN1cmU/OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgha2V5IHx8IC9eKD86ZXhwaXJlc3xtYXhcXC1hZ2V8cGF0aHxkb21haW58c2VjdXJlKSQvaS50ZXN0KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2lsbEV4cGlyZXMgPSBcIjsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVFwiO1xyXG4gICAgICAgICAgICBpZiAoZXhwaXJlcykge1xyXG4gICAgICAgICAgICAgICAgd2lsbEV4cGlyZXMgPSBcIjsgbWF4LWFnZT1cIiArIChleHBpcmVzKjM2MDAwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFYgPSB0aGlzLmNvb2tpZXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBsZXQgelZhbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICB6VmFsID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoelZhbCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsRXhwaXJlcyArIChkb21haW4gPyBcIjsgZG9tYWluPVwiICsgZG9tYWluIDogXCJcIikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocGF0aCA/IFwiOyBwYXRoPVwiICsgcGF0aCA6IFwiXCIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlzU2VjdXJlID8gXCI7IHNlY3VyZVwiIDogXCJcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzLmNvb2tpZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0cy5jb29raWVzW2tleV0ubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFYsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMuZ2V0SXRlbSA9IChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBkZWNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKD86KD86XnwuKjspXFxcXHMqXCIgK1xyXG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGtleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgXCJcXFxcJCZcIikgK1xyXG4gICAgICAgICAgICAgICAgXCJcXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiRcIiksIFwiJDFcIikpIHx8IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvSnNvbihyZXN1bHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmhhc0l0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXCIoPzpefDtcXFxccyopXCIgKyBlbmNvZGVVUklDb21wb25lbnQoa2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArIFwiXFxcXHMqXFxcXD1cIilcclxuICAgICAgICAgICAgKS50ZXN0KGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMucmVtb3ZlSXRlbSA9IChrZXk6IHN0cmluZywgcGF0aD86IHN0cmluZywgZG9tYWluPzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgha2V5IHx8ICF0aGlzLmNvb2tpZXMuaGFzSXRlbShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgb2xkViA9IHRoaXMuc3ViamVjdHMuY29va2llc1trZXldID8gdGhpcy5jb29raWVzLmdldEl0ZW0oa2V5KTogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVRcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIGRvbWFpbiA/IFwiOyBkb21haW49XCIgKyBkb21haW4gOiBcIlwiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHBhdGggPyBcIjsgcGF0aD1cIiArIHBhdGggOiBcIlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3ViamVjdHMuY29va2llc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RzLmNvb2tpZXNba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVixcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmdldEFsbEtleXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgXCJcIikuc3BsaXQoL1xccyooPzpcXD1bXjtdKik/O1xccyovKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbklkeCA9IDA7IG5JZHggPCBhS2V5cy5sZW5ndGg7IG5JZHgrKykge1xyXG4gICAgICAgICAgICAgICAgYUtleXNbbklkeF0gPSBkZWNvZGVVUklDb21wb25lbnQoYUtleXNbbklkeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhS2V5cztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29va2llcy5jbGVhciA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb29raWVzLmdldEFsbEtleXMoKS5tYXAoXHJcbiAgICAgICAgICAgICAgICAoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb29raWVzLnJlbW92ZUl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvSnNvbih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHggPSB2YWx1ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB4ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgfWNhdGNoKGUpe31cclxuICAgICAgICByZXR1cm4geDtcclxuICAgIH1cclxufVxyXG4iXX0=