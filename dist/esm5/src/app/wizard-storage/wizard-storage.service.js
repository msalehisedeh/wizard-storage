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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC93aXphcmQtc3RvcmFnZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvd2l6YXJkLXN0b3JhZ2Uvd2l6YXJkLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztJQTZHakM7UUFBQSxpQkE2SEM7d0JBak9rQjtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBa0dHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxjQUFPLE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBLEVBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxVQUFDLEdBQVcsSUFBTSxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUEsRUFBQyxDQUFBO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFnQixFQUFFLE9BQWdCO1lBQy9FLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFDLEdBQVcsRUFBRSxPQUFnQixJQUFNLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxD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Q0FBQyxRQUFRLENBQUMsSUFBSTthQUM5QixDQUFDLENBQUM7U0FDTjs7Ozs7O0lBRUcseUNBQVU7Ozs7Y0FBQyxPQUFZOztRQUMzQixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFDLENBQUM7U0FDakM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0lBRVYsdUNBQVE7Ozs7O2NBQUMsR0FBVyxFQUFFLE9BQWU7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztJQWtJdkMscUNBQU07Ozs7SUFBTixVQUFPLEtBQVU7O1FBQ2IsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2QsSUFBSSxDQUFDO1lBQ0QsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFBQSxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNaOztnQkFoUEosVUFBVTs7OzsrQkFYWDs7U0FZYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLypcclxuKiBXaXphcmRTdG9yYWdlIHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIHVzZSB3ZWIgc3RvcmFnZSBjYXBhYmlsaXRpZXMgb2YgbW9kZXJuIHdlYiBicm93c2Vycy5cclxuKlxyXG4qIHJlZmVyZW5jZSB0byBicm93c2VyIGNvbXBhdGliaWxpdGllcy5cclxuKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L2xvY2FsU3RvcmFnZSNCcm93c2VyX2NvbXBhdGliaWxpdHlcclxuKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L3Nlc3Npb25TdG9yYWdlI0Jyb3dzZXJfY29tcGF0aWJpbGl0eVxyXG4qL1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBXaXphcmRTdG9yYWdlU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGxvY2FsOiBhbnk7XHJcbiAgICBwdWJsaWMgc2Vzc2lvbjogYW55O1xyXG4gICAgcHVibGljIGNvb2tpZXM6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHN1YmplY3RzID0ge1xyXG4gICAgICAgIGxvY2FsOiB7fSxcclxuICAgICAgICBzZXNzaW9uOiB7fSxcclxuICAgICAgICBjb29raWVzOiB7fVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGlzU3VwcG9ydGVkKHN0b3JhZ2U6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1CYWNrdXAgPSBzdG9yYWdlLmdldEl0ZW0oJycpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJycpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oJycsIGl0ZW1CYWNrdXApO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUJhY2t1cCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSgnJywgaXRlbUJhY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEl0ZW0oc3RvcmU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZlcnNpb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlOiBhbnkgPSBzdG9yZSA9PT0gJ3Nlc3Npb24nID8gc2Vzc2lvblN0b3JhZ2UgOiBsb2NhbFN0b3JhZ2VcclxuICAgICAgICBjb25zdCBpdGVtID0gc3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnBhcnNlKGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGl0ZW1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2ZXJzaW9uICYmIGNvbnRlbnQudmVyc2lvbikge1xyXG4gICAgICAgICAgICBpZiAodmVyc2lvbiA9PSBjb250ZW50LnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRlbnQuZGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbnRlbnQuZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdCAmJiBjb250ZW50LmV4cGlyZXMpIHtcclxuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpID49IGNvbnRlbnQuZXhwaXJlcykge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHNbc3RvcmVdW2tleV0ubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldEl0ZW0oc3RvcmU6IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHZlcnNpb24/OiBzdHJpbmcsIGV4cGlyZXM/OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlOiBhbnkgPSBzdG9yZSA9PT0gJ3Nlc3Npb24nID8gc2Vzc2lvblN0b3JhZ2UgOiBsb2NhbFN0b3JhZ2VcclxuICAgICAgICBjb25zdCBjb250ZW50OiBhbnkgPSB7ZGF0YTogdmFsdWV9O1xyXG5cclxuICAgICAgICBpZiAodmVyc2lvbikge1xyXG4gICAgICAgICAgICBjb250ZW50LnZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXhwaXJlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIChleHBpcmVzKjM2MDAwMDApKTsgXHJcbiAgICAgICAgICAgIGNvbnRlbnQuZXhwaXJlcyA9IGQuZ2V0VGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvbGRWID0gc3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoY29udGVudCkpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1YmplY3RzW3N0b3JlXVtrZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdHNbc3RvcmVdW2tleV0ubmV4dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWLFxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRBbGxLZXlzKHN0b3JhZ2U6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHN0b3JhZ2Uua2V5KCBpICkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZShrZXk6IHN0cmluZywgc3RvcmFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN1YmplY3RzW3N0b3JhZ2VdW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yYWdlXVtrZXldID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0c1tzdG9yYWdlXVtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNlc3Npb24gPSBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLmlzU3VwcG9ydGVkID0gKCkgPT4ge3JldHVybiB0aGlzLmlzU3VwcG9ydGVkKHNlc3Npb25TdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLm9uY2hhbmdlID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMub25DaGFuZ2Uoa2V5LCAnc2Vzc2lvbicpfVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SXRlbSgnc2Vzc2lvbicsIGtleSwgdmFsdWUsIHZlcnNpb24sIGV4cGlyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLmdldEl0ZW0gPSAoa2V5OiBzdHJpbmcsIHZlcnNpb24/OiBzdHJpbmcpID0+IHtyZXR1cm4gdGhpcy5nZXRJdGVtKCdzZXNzaW9uJywga2V5LCB2ZXJzaW9uKX07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLmhhc0l0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpICE9PSBudWxsfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24ucmVtb3ZlSXRlbSA9IChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvbGRWID0gdGhpcy5zdWJqZWN0cy5zZXNzaW9uW2tleV0gPyB0aGlzLnNlc3Npb24uZ2V0SXRlbShrZXkpOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3ViamVjdHMuc2Vzc2lvbltrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RzLnNlc3Npb25ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVixcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uZ2V0QWxsS2V5cyA9ICgpID0+IHtyZXR1cm4gdGhpcy5nZXRBbGxLZXlzKHNlc3Npb25TdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLmNsZWFyID0gKCkgPT4geyBzZXNzaW9uU3RvcmFnZS5jbGVhcigpfTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2NhbCA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgICB0aGlzLmxvY2FsLmlzU3VwcG9ydGVkID0gKCkgPT4ge3JldHVybiB0aGlzLmlzU3VwcG9ydGVkKGxvY2FsU3RvcmFnZSl9O1xyXG4gICAgICAgIHRoaXMubG9jYWwub25jaGFuZ2UgPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gdGhpcy5vbkNoYW5nZShrZXksICdsb2NhbCcpfVxyXG4gICAgICAgIHRoaXMubG9jYWwuc2V0SXRlbSA9IChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgdmVyc2lvbj86IHN0cmluZywgZXhwaXJlcz86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW0oJ2xvY2FsJywga2V5LCB2YWx1ZSx2ZXJzaW9uLCBleHBpcmVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9jYWwuZ2V0SXRlbSA9IChrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykgPT4ge3JldHVybiB0aGlzLmdldEl0ZW0oJ2xvY2FsJywga2V5LCB2ZXJzaW9uKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5oYXNJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgIT09IG51bGx9O1xyXG4gICAgICAgIHRoaXMubG9jYWwucmVtb3ZlSXRlbSA9IChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvbGRWID0gdGhpcy5zdWJqZWN0cy5sb2NhbFtrZXldID8gdGhpcy5sb2NhbC5nZXRJdGVtKGtleSk6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0cy5sb2NhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RzLmxvY2FsW2tleV0ubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFYsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5jbGVhciA9ICgpID0+IHtsb2NhbFN0b3JhZ2UuY2xlYXIoKX07XHJcblxyXG4gICAgICAgIHRoaXMuY29va2llcyA9ICBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmlzU3VwcG9ydGVkID0gKCkgPT4ge3JldHVybiB0cnVlO307XHJcbiAgICAgICAgdGhpcy5jb29raWVzLm9uY2hhbmdlID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMub25DaGFuZ2Uoa2V5LCAnY29va2llcycpfVxyXG4gICAgICAgIHRoaXMuY29va2llcy5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogbnVtYmVyLCBkb21haW4/OiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIGlzU2VjdXJlPzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWtleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdpbGxFeHBpcmVzID0gXCI7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVRcIjtcclxuICAgICAgICAgICAgaWYgKGV4cGlyZXMpIHtcclxuICAgICAgICAgICAgICAgIHdpbGxFeHBpcmVzID0gXCI7IG1heC1hZ2U9XCIgKyAoZXhwaXJlcyozNjAwMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvbGRWID0gdGhpcy5jb29raWVzLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgbGV0IHpWYWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgelZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHpWYWwpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbEV4cGlyZXMgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhdGggPyBcIjsgcGF0aD1cIiArIHBhdGggOiBcIlwiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpc1NlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJqZWN0cy5jb29raWVzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdHMuY29va2llc1trZXldLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb29raWVzLmdldEl0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZGVjb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChcIig/Oig/Ol58Lio7KVxcXFxzKlwiICtcclxuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csIFwiXFxcXCQmXCIpICtcclxuICAgICAgICAgICAgICAgIFwiXFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokXCIpLCBcIiQxXCIpKSB8fCBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0pzb24ocmVzdWx0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29va2llcy5oYXNJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFwiKD86Xnw7XFxcXHMqKVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGtleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgXCJcXFxcJCZcIikgKyBcIlxcXFxzKlxcXFw9XCIpXHJcbiAgICAgICAgICAgICkudGVzdChkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jb29raWVzLnJlbW92ZUl0ZW0gPSAoa2V5OiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIGRvbWFpbj86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWtleSB8fCAhdGhpcy5jb29raWVzLmhhc0l0ZW0oa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFYgPSB0aGlzLnN1YmplY3RzLmNvb2tpZXNba2V5XSA/IHRoaXMuY29va2llcy5nZXRJdGVtKGtleSk6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBkb21haW4gPyBcIjsgZG9tYWluPVwiICsgZG9tYWluIDogXCJcIikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzLmNvb2tpZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0cy5jb29raWVzW2tleV0ubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFYsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29va2llcy5nZXRBbGxLZXlzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYUtleXMgPSBkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKCg/Ol58XFxzKjspW15cXD1dKykoPz07fCQpfF5cXHMqfFxccyooPzpcXD1bXjtdKik/KD86XFwxfCQpL2csIFwiXCIpLnNwbGl0KC9cXHMqKD86XFw9W147XSopPztcXHMqLyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG5JZHggPSAwOyBuSWR4IDwgYUtleXMubGVuZ3RoOyBuSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIGFLZXlzW25JZHhdID0gZGVjb2RlVVJJQ29tcG9uZW50KGFLZXlzW25JZHhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYUtleXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvb2tpZXMuY2xlYXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29va2llcy5nZXRBbGxLZXlzKCkubWFwKFxyXG4gICAgICAgICAgICAgICAgKGl0ZW06IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29va2llcy5yZW1vdmVJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b0pzb24odmFsdWU6IGFueSkge1xyXG4gICAgICAgIGxldCB4ID0gdmFsdWU7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgeCA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgIH1jYXRjaChlKXt9XHJcbiAgICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcbn1cclxuIl19