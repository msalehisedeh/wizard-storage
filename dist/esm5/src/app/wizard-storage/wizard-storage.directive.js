import * as tslib_1 from "tslib";
import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { WizardStorageService } from './wizard-storage.service';
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
    tslib_1.__decorate([
        HostListener('window:storage', ['$event'])
    ], WizardStorageDirective.prototype, "onHover", null);
    tslib_1.__decorate([
        Output()
    ], WizardStorageDirective.prototype, "wizardStorage", void 0);
    WizardStorageDirective = tslib_1.__decorate([
        Directive({
            selector: '[wizardStorage]'
        })
    ], WizardStorageDirective);
    return WizardStorageDirective;
}());
export { WizardStorageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLaEU7SUFpQkksZ0NBQ1ksYUFBbUM7UUFBbkMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBSC9DLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFLdEQsQ0FBQztJQWxCRCwyQ0FBMkM7SUFDM0MseUJBQXlCO0lBRXpCLHdDQUFPLEdBQVAsVUFBUSxLQUFVO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbkQsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbkQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQU0wQixvQkFBb0I7O0lBYi9DO1FBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7eURBUTFDO0lBR0Q7UUFEQyxNQUFNLEVBQUU7aUVBQzZDO0lBZjdDLHNCQUFzQjtRQUhsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1NBQzlCLENBQUM7T0FDVyxzQkFBc0IsQ0FzQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQXRCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi93aXphcmQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbd2l6YXJkU3RvcmFnZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaXphcmRTdG9yYWdlRGlyZWN0aXZlIHtcclxuXHJcbiAgICAvLyBXaWxsIGxpc3RlbiB0byBsb2NhbFN0b3JhZ2UgY2hhbmdlcyBtYWRlXHJcbiAgICAvLyBieSBvdGhlciBhcHBsaWNhdGlvbnMuXHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c3RvcmFnZScsIFsnJGV2ZW50J10pXHJcbiAgICBvbkhvdmVyKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLndpemFyZFN0b3JhZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgIGtleTogZXZlbnQua2V5LFxyXG4gICAgICAgICAgICBvbGRWYWx1ZTogdGhpcy53aXphcmRTZXJ2aWNlLnRvSnNvbihldmVudC5vbGRWYWx1ZSksXHJcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLndpemFyZFNlcnZpY2UudG9Kc29uKGV2ZW50Lm5ld1ZhbHVlKSxcclxuICAgICAgICAgICAgdXJsOiBldmVudC51cmxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHdpemFyZFN0b3JhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkU2VydmljZTogV2l6YXJkU3RvcmFnZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxufSJdfQ==