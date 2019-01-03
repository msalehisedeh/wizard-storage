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
            this.subjects[storage][key] = new BehaviorSubject(null);
        }
        return this.subjects[storage][key];
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
    WizardStorageService.prototype.subjects;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7O0lBdUdqQztRQUFBLGlCQXlCQzt3QkF6SGtCO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtTQUNkO1FBOEZHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxjQUFPLE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBLEVBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxVQUFDLEdBQVcsSUFBTSxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUEsRUFBQyxDQUFBO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFnQixFQUFFLE9BQWdCO1lBQy9FLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFDLEdBQVcsRUFBRSxPQUFnQixJQUFNLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUEsRUFBQyxDQUFDO1FBQ3pHLElB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IHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIHVzZSB3ZWIgc3RvcmFnZSBjYXBhYmlsaXRpZXMgb2YgbW9kZXJuIHdlYiBicm93c2Vycy5cclxuKlxyXG4qIHJlZmVyZW5jZSB0byBicm93c2VyIGNvbXBhdGliaWxpdGllcy5cclxuKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L2xvY2FsU3RvcmFnZSNCcm93c2VyX2NvbXBhdGliaWxpdHlcclxuKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L3Nlc3Npb25TdG9yYWdlI0Jyb3dzZXJfY29tcGF0aWJpbGl0eVxyXG4qL1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBXaXphcmRTdG9yYWdlU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGxvY2FsOiBhbnk7XHJcbiAgICBwdWJsaWMgc2Vzc2lvbjogYW55O1xyXG4gICAgcHJpdmF0ZSBzdWJqZWN0cyA9IHtcclxuICAgICAgICBsb2NhbDoge30sXHJcbiAgICAgICAgc2Vzc2lvbjoge31cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N1cHBvcnRlZChzdG9yYWdlOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQmFja3VwID0gc3RvcmFnZS5nZXRJdGVtKCcnKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCcnKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKCcnLCBpdGVtQmFja3VwKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1CYWNrdXAgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgnJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oJycsIGl0ZW1CYWNrdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtKHN0b3JlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZTogYW55ID0gc3RvcmUgPT09ICdzZXNzaW9uJyA/IHNlc3Npb25TdG9yYWdlIDogbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGxldCBjb250ZW50OiBhbnkgPSB7fTtcclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5wYXJzZShpdGVtKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmVyc2lvbiAmJiBjb250ZW50LnZlcnNpb24pIHtcclxuICAgICAgICAgICAgaWYgKHZlcnNpb24gPT0gY29udGVudC52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb250ZW50LmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjb250ZW50LmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgY29udGVudC5leHBpcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSA+PSBjb250ZW50LmV4cGlyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YmplY3RzW3N0b3JlXVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRJdGVtKHN0b3JlOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZTogYW55ID0gc3RvcmUgPT09ICdzZXNzaW9uJyA/IHNlc3Npb25TdG9yYWdlIDogbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgY29uc3QgY29udGVudDogYW55ID0ge2RhdGE6IHZhbHVlfTtcclxuXHJcbiAgICAgICAgaWYgKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgY29udGVudC52ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4cGlyZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJlcyozNjAwMDAwKSk7IFxyXG4gICAgICAgICAgICBjb250ZW50LmV4cGlyZXMgPSBkLmdldFRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3ViamVjdHNbc3RvcmVdW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0c1tzdG9yZV1ba2V5XS5uZXh0KHtcclxuICAgICAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHN0b3JhZ2UuZ2V0SXRlbShrZXkpLFxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShjb250ZW50KSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEFsbEtleXMoc3RvcmFnZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goc3RvcmFnZS5rZXkoIGkgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlKGtleTogc3RyaW5nLCBzdG9yYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3ViamVjdHNbc3RvcmFnZV1ba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YmplY3RzW3N0b3JhZ2VdW2tleV0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3RzW3N0b3JhZ2VdW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5pc1N1cHBvcnRlZCA9ICgpID0+IHtyZXR1cm4gdGhpcy5pc1N1cHBvcnRlZChzZXNzaW9uU3RvcmFnZSl9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5vbmNoYW5nZSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiB0aGlzLm9uQ2hhbmdlKGtleSwgJ3Nlc3Npb24nKX1cclxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0SXRlbSA9IChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgdmVyc2lvbj86IHN0cmluZywgZXhwaXJlcz86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW0oJ3Nlc3Npb24nLCBrZXksIHZhbHVlLCB2ZXJzaW9uLCBleHBpcmVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5nZXRJdGVtID0gKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMuZ2V0SXRlbSgnc2Vzc2lvbicsIGtleSwgdmVyc2lvbil9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5oYXNJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7cmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbH07XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLnJlbW92ZUl0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSl9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMoc2Vzc2lvblN0b3JhZ2UpfTtcclxuICAgICAgICB0aGlzLnNlc3Npb24uY2xlYXIgPSAoKSA9PiB7IHNlc3Npb25TdG9yYWdlLmNsZWFyKCl9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvY2FsID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMubG9jYWwuaXNTdXBwb3J0ZWQgPSAoKSA9PiB7cmV0dXJuIHRoaXMuaXNTdXBwb3J0ZWQobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5vbmNoYW5nZSA9IChrZXk6IHN0cmluZykgPT4ge3JldHVybiB0aGlzLm9uQ2hhbmdlKGtleSwgJ2xvY2FsJyl9XHJcbiAgICAgICAgdGhpcy5sb2NhbC5zZXRJdGVtID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogc3RyaW5nLCBleHBpcmVzPzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SXRlbSgnbG9jYWwnLCBrZXksIHZhbHVlLHZlcnNpb24sIGV4cGlyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRJdGVtID0gKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSA9PiB7cmV0dXJuIHRoaXMuZ2V0SXRlbSgnbG9jYWwnLCBrZXksIHZlcnNpb24pfTtcclxuICAgICAgICB0aGlzLmxvY2FsLmhhc0l0ZW0gPSAoa2V5OiBzdHJpbmcpID0+IHtyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbH07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5yZW1vdmVJdGVtID0gKGtleTogc3RyaW5nKSA9PiB7bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5nZXRBbGxLZXlzID0gKCkgPT4ge3JldHVybiB0aGlzLmdldEFsbEtleXMobG9jYWxTdG9yYWdlKX07XHJcbiAgICAgICAgdGhpcy5sb2NhbC5jbGVhciA9ICgpID0+IHtsb2NhbFN0b3JhZ2UuY2xlYXIoKX07XHJcbiAgICB9XHJcbn1cclxuIl19