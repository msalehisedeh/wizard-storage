/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { WizardStorageService } from './wizard-storage.service';
export class WizardStorageDirective {
    /**
     * @param {?} wizardService
     */
    constructor(wizardService) {
        this.wizardService = wizardService;
        this.wizardStorage = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onHover(event) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.wizardService.toJson(event.oldValue),
            newValue: this.wizardService.toJson(event.newValue),
            url: event.url
        });
    }
}
WizardStorageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wizardStorage]'
            },] }
];
/** @nocollapse */
WizardStorageDirective.ctorParameters = () => [
    { type: WizardStorageService }
];
WizardStorageDirective.propDecorators = {
    onHover: [{ type: HostListener, args: ['window:storage', ['$event'],] }],
    wizardStorage: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    WizardStorageDirective.prototype.wizardStorage;
    /** @type {?} */
    WizardStorageDirective.prototype.wizardService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vd2l6YXJkLXN0b3JhZ2UvIiwic291cmNlcyI6WyJzcmMvYXBwL3dpemFyZC1zdG9yYWdlL3dpemFyZC1zdG9yYWdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUtoRSxNQUFNOzs7O0lBaUJGLFlBQ1k7UUFBQSxrQkFBYSxHQUFiLGFBQWE7NkJBSFUsSUFBSSxZQUFZLEVBQUU7S0FLcEQ7Ozs7O0lBZkQsT0FBTyxDQUFDLEtBQVU7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNwQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNuRCxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNuRCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFDO0tBQ047OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7O1lBSlEsb0JBQW9COzs7c0JBU3hCLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFVekMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dpemFyZC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t3aXphcmRTdG9yYWdlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdpemFyZFN0b3JhZ2VEaXJlY3RpdmUge1xyXG5cclxuICAgIC8vIFdpbGwgbGlzdGVuIHRvIGxvY2FsU3RvcmFnZSBjaGFuZ2VzIG1hZGVcclxuICAgIC8vIGJ5IG90aGVyIGFwcGxpY2F0aW9ucy5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzdG9yYWdlJywgWyckZXZlbnQnXSlcclxuICAgIG9uSG92ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMud2l6YXJkU3RvcmFnZS5lbWl0KHtcclxuICAgICAgICAgICAga2V5OiBldmVudC5rZXksXHJcbiAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLndpemFyZFNlcnZpY2UudG9Kc29uKGV2ZW50Lm9sZFZhbHVlKSxcclxuICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMud2l6YXJkU2VydmljZS50b0pzb24oZXZlbnQubmV3VmFsdWUpLFxyXG4gICAgICAgICAgICB1cmw6IGV2ZW50LnVybFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgd2l6YXJkU3RvcmFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmRTZXJ2aWNlOiBXaXphcmRTdG9yYWdlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG59Il19