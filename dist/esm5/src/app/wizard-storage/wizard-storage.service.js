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
            if (_this.subjects.cookies[key]) {
                _this.subjects.cookies[key].next({
                    key: key,
                    oldValue: _this.cookies.getItem(key),
                    newValue: value,
                    url: document.location.href
                });
            }
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            document.cookie = encodeURIComponent(key) + "=" +
                encodeURIComponent(value) +
                willExpires + (domain ? "; domain=" + domain : "") +
                (path ? "; path=" + path : "") +
                (isSecure ? "; secure" : "");
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
            if (_this.subjects.cookies[key]) {
                _this.subjects.cookies[key].next({
                    key: key,
                    oldValue: _this.cookies.getItem(key),
                    newValue: null,
                    url: document.location.href
                });
            }
            document.cookie = encodeURIComponent(key) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (domain ? "; domain=" + domain : "") +
                (path ? "; path=" + path : "");
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
                        oldValue: content,
                        newValue: null,
                        url: document.location.href
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
                newValue: content,
                url: document.location.href
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7O0lBNEdqQztRQUFBLGlCQTJGQzt3QkE5TGtCO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFpR0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGNBQU8sTUFBTSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUEsRUFBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFVBQUMsR0FBVyxJQUFNLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQSxFQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBQyxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0I7WUFDL0UsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekQsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLE9BQWdCLElBQU0sTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FB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Ozs7OztJQUVWLHVDQUFROzs7OztjQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztTQUNoRTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFnR3ZDLHFDQUFNOzs7O0lBQU4sVUFBTyxLQUFVOztRQUNiLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNkLElBQUksQ0FBQztZQUNELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztRQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjs7Z0JBN01KLFVBQVU7Ozs7K0JBWFg7O1NBWWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qXHJcbiogV2l6YXJkU3RvcmFnZSBwcm92aWRlcyBhbiBlYXN5IHdheSB0byB1c2Ugd2ViIHN0b3JhZ2UgY2FwYWJpbGl0aWVzIG9mIG1vZGVybiB3ZWIgYnJvd3NlcnMuXHJcbipcclxuKiByZWZlcmVuY2UgdG8gYnJvd3NlciBjb21wYXRpYmlsaXRpZXMuXHJcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9sb2NhbFN0b3JhZ2UjQnJvd3Nlcl9jb21wYXRpYmlsaXR5XHJcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9zZXNzaW9uU3RvcmFnZSNCcm93c2VyX2NvbXBhdGliaWxpdHlcclxuKi9cclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgV2l6YXJkU3RvcmFnZVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBsb2NhbDogYW55O1xyXG4gICAgcHVibGljIHNlc3Npb246IGFueTtcclxuICAgIHB1YmxpYyBjb29raWVzOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJqZWN0cyA9IHtcclxuICAgICAgICBsb2NhbDoge30sXHJcbiAgICAgICAgc2Vzc2lvbjoge30sXHJcbiAgICAgICAgY29va2llczoge31cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N1cHBvcnRlZChzdG9yYWdlOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQmFja3VwID0gc3RvcmFnZS5nZXRJdGVtKCcnKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCcnKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCcnLCBpdGVtQmFja3VwKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1CYWNrdXAgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgnJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oJycsIGl0ZW1CYWNrdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtKHN0b3JlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZTogYW55ID0gc3RvcmUgPT09ICdzZXNzaW9uJyA/IHNlc3Npb25TdG9yYWdlIDogbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGxldCBjb250ZW50OiBhbnkgPSB7fTtcclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5wYXJzZShpdGVtKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmVyc2lvbiAmJiBjb250ZW50LnZlcnNpb24pIHtcclxuICAgICAgICAgICAgaWYgKHZlcnNpb24gPT0gY29udGVudC52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb250ZW50LmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjb250ZW50LmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgY29udGVudC5leHBpcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSA+PSBjb250ZW50LmV4cGlyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzW3N0b3JlXVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRJdGVtKHN0b3JlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZTogYW55ID0gc3RvcmUgPT09ICdzZXNzaW9uJyA/IHNlc3Npb25TdG9yYWdlIDogbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgY29uc3QgY29udGVudDogYW55ID0ge2RhdGE6IHZhbHVlfTtcclxuXHJcbiAgICAgICAgaWYgKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgY29udGVudC52ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4cGlyZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJlcyozNjAwMDAwKSk7IFxyXG4gICAgICAgICAgICBjb250ZW50LmV4cGlyZXMgPSBkLmdldFRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3ViamVjdHNbc3RvcmVdW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHN0b3JhZ2UuZ2V0SXRlbShrZXkpLFxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0QWxsS2V5cyhzdG9yYWdlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RvcmFnZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChzdG9yYWdlLmtleSggaSApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25DaGFuZ2Uoa2V5OiBzdHJpbmcsIHN0b3JhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdGhpcy5zdWJqZWN0c1tzdG9yYWdlXVtrZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdHNbc3RvcmFnZV1ba2V5XSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdHNbc3RvcmFnZV1ba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5pc1N1cHBvcnRlZCA9ICgpID0+IHtyZXR1cm4gdGhpcy5pc1N1cHBvcnRlZChzZXNzaW9uU3RvcmFnZSl9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5vbmNoYW5nZSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiB0aGlzLm9uQ2hhbmdlKGtleSwgJ3Nlc3Npb24nKX1cclxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0SXRlbSA9IChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgdmVyc2lvbj86IHN0cmluZywgZXhwaXJlcz86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW0oJ3Nlc3Npb24nLCBrZXksIHZhbHVlLCB2ZXJzaW9uLCBleHBpcmVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5nZXRJdGVtID0gKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMuZ2V0SXRlbSgnc2Vzc2lvbicsIGtleSwgdmVyc2lvbil9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5oYXNJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbH07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLnJlbW92ZUl0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSl9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMoc2Vzc2lvblN0b3JhZ2UpfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uY2xlYXIgPSAoKSA9PiB7IHNlc3Npb25TdG9yYWdlLmNsZWFyKCl9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvY2FsID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMubG9jYWwuaXNTdXBwb3J0ZWQgPSAoKSA9PiB7cmV0dXJuIHRoaXMuaXNTdXBwb3J0ZWQobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5vbmNoYW5nZSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiB0aGlzLm9uQ2hhbmdlKGtleSwgJ2xvY2FsJyl9XHJcbiAgICAgICAgdGhpcy5sb2NhbC5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SXRlbSgnbG9jYWwnLCBrZXksIHZhbHVlLHZlcnNpb24sIGV4cGlyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRJdGVtID0gKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMuZ2V0SXRlbSgnbG9jYWwnLCBrZXksIHZlcnNpb24pfTtcclxuICAgICAgICB0aGlzLmxvY2FsLmhhc0l0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5yZW1vdmVJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5jbGVhciA9ICgpID0+IHtsb2NhbFN0b3JhZ2UuY2xlYXIoKX07XHJcblxyXG4gICAgICAgIHRoaXMuY29va2llcyA9ICBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmlzU3VwcG9ydGVkID0gKCkgPT4ge3JldHVybiB0cnVlO307XHJcbiAgICAgICAgdGhpcy5jb29raWVzLm9uY2hhbmdlID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMub25DaGFuZ2Uoa2V5LCAnY29va2llcycpfVxyXG4gICAgICAgIHRoaXMuY29va2llcy5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogbnVtYmVyLCBkb21haW4/OiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIGlzU2VjdXJlPzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWtleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdpbGxFeHBpcmVzID0gXCI7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVRcIjtcclxuICAgICAgICAgICAgaWYgKGV4cGlyZXMpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxFeHBpcmVzID0gXCI7IG1heC1hZ2U9XCIgKyAoZXhwaXJlcyozNjAwMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0cy5jb29raWVzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHMuY29va2llc1trZXldLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLmNvb2tpZXMuZ2V0SXRlbShrZXkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbEV4cGlyZXMgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhdGggPyBcIjsgcGF0aD1cIiArIHBhdGggOiBcIlwiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpc1NlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29va2llcy5nZXRJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzooPzpefC4qOylcXFxccypcIiArXHJcbiAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoa2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCBcIlxcXFwkJlwiKSArXHJcbiAgICAgICAgICAgICAgICBcIlxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJFwiKSwgXCIkMVwiKSkgfHwgbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Kc29uKHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMuaGFzSXRlbSA9IChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcIig/Ol58O1xcXFxzKilcIiArIGVuY29kZVVSSUNvbXBvbmVudChrZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csIFwiXFxcXCQmXCIpICsgXCJcXFxccypcXFxcPVwiKVxyXG4gICAgICAgICAgICApLnRlc3QoZG9jdW1lbnQuY29va2llKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29va2llcy5yZW1vdmVJdGVtID0gKGtleTogc3RyaW5nLCBwYXRoPzogc3RyaW5nLCBkb21haW4/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFrZXkgfHwgIXRoaXMuY29va2llcy5oYXNJdGVtKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0cy5jb29raWVzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHMuY29va2llc1trZXldLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLmNvb2tpZXMuZ2V0SXRlbShrZXkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBkb21haW4gPyBcIjsgZG9tYWluPVwiICsgZG9tYWluIDogXCJcIikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmdldEFsbEtleXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgXCJcIikuc3BsaXQoL1xccyooPzpcXD1bXjtdKik/O1xccyovKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbklkeCA9IDA7IG5JZHggPCBhS2V5cy5sZW5ndGg7IG5JZHgrKykgeyBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIGFLZXlzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdG9Kc29uKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgeCA9IHZhbHVlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHggPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICB9Y2F0Y2goZSl7fVxyXG4gICAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==