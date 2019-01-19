/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { WizardStorageService } from './wizard-storage.service';
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
export { WizardStorageDirective };
if (false) {
    /** @type {?} */
    WizardStorageDirective.prototype.wizardStorage;
    /** @type {?} */
    WizardStorageDirective.prototype.wizardService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0lBc0I1RCxnQ0FDWTtRQUFBLGtCQUFhLEdBQWIsYUFBYTs2QkFIVSxJQUFJLFlBQVksRUFBRTtLQUtwRDtJQWxCRCwyQ0FBMkM7SUFDM0MseUJBQXlCOzs7OztJQUV6Qix3Q0FBTzs7OztJQURQLFVBQ1EsS0FBVTtRQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ25ELFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ25ELEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztTQUNqQixDQUFDLENBQUM7S0FDTjs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCOzs7O2dCQUpRLG9CQUFvQjs7OzBCQVN4QixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBVXpDLE1BQU07O2lDQTNCWDs7U0FhYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi93aXphcmQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbd2l6YXJkU3RvcmFnZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaXphcmRTdG9yYWdlRGlyZWN0aXZlIHtcclxuXHJcbiAgICAvLyBXaWxsIGxpc3RlbiB0byBsb2NhbFN0b3JhZ2UgY2hhbmdlcyBtYWRlXHJcbiAgICAvLyBieSBvdGhlciBhcHBsaWNhdGlvbnMuXHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c3RvcmFnZScsIFsnJGV2ZW50J10pXHJcbiAgICBvbkhvdmVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLndpemFyZFN0b3JhZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgIGtleTogZXZlbnQua2V5LFxyXG4gICAgICAgICAgICBvbGRWYWx1ZTogdGhpcy53aXphcmRTZXJ2aWNlLnRvSnNvbihldmVudC5vbGRWYWx1ZSksXHJcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLndpemFyZFNlcnZpY2UudG9Kc29uKGV2ZW50Lm5ld1ZhbHVlKSxcclxuICAgICAgICAgICAgdXJsOiBldmVudC51cmxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHdpemFyZFN0b3JhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkU2VydmljZTogV2l6YXJkU3RvcmFnZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxufSJdfQ==