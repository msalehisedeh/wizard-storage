import * as tslib_1 from "tslib";
import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { WizardStorageService } from './wizard-storage.service';
let WizardStorageDirective = class WizardStorageDirective {
    constructor(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    // Will listen to localStorage changes made
    // by other applications.
    onHover(event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    }
};
WizardStorageDirective.ctorParameters = () => [
    { type: WizardStorageService }
];
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
export { WizardStorageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLaEUsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFpQi9CLFlBQ1ksYUFBbUM7UUFBbkMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBSC9DLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFLdEQsQ0FBQztJQWxCRCwyQ0FBMkM7SUFDM0MseUJBQXlCO0lBRXpCLE9BQU8sQ0FBQyxLQUFVO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbkQsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbkQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FVSixDQUFBOztZQUo4QixvQkFBb0I7O0FBYi9DO0lBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7cURBUTFDO0FBR0Q7SUFEQyxNQUFNLEVBQUU7NkRBQzZDO0FBZjdDLHNCQUFzQjtJQUhsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO0tBQzlCLENBQUM7R0FDVyxzQkFBc0IsQ0FzQmxDO1NBdEJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dpemFyZC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t3aXphcmRTdG9yYWdlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdpemFyZFN0b3JhZ2VEaXJlY3RpdmUge1xyXG5cclxuICAgIC8vIFdpbGwgbGlzdGVuIHRvIGxvY2FsU3RvcmFnZSBjaGFuZ2VzIG1hZGVcclxuICAgIC8vIGJ5IG90aGVyIGFwcGxpY2F0aW9ucy5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzdG9yYWdlJywgWyckZXZlbnQnXSlcclxuICAgIG9uSG92ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMud2l6YXJkU3RvcmFnZS5lbWl0KHtcclxuICAgICAgICAgICAga2V5OiBldmVudC5rZXksXHJcbiAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLndpemFyZFNlcnZpY2UudG9Kc29uKGV2ZW50Lm9sZFZhbHVlKSxcclxuICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMud2l6YXJkU2VydmljZS50b0pzb24oZXZlbnQubmV3VmFsdWUpLFxyXG4gICAgICAgICAgICB1cmw6IGV2ZW50LnVybFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgd2l6YXJkU3RvcmFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmRTZXJ2aWNlOiBXaXphcmRTdG9yYWdlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG59Il19