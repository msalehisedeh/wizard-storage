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
            oldValue: this.toJson(event.oldValue),
            newValue: this.toJson(event.newValue),
            url: event.url
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toJson(value) {
        /** @type {?} */
        let x = value;
        try {
            x = JSON.parse(value);
        }
        catch (e) { }
        return x;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vd2l6YXJkLXN0b3JhZ2UvIiwic291cmNlcyI6WyJzcmMvYXBwL3dpemFyZC1zdG9yYWdlL3dpemFyZC1zdG9yYWdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUtoRSxNQUFNOzs7O0lBd0JGLFlBQ1k7UUFBQSxrQkFBYSxHQUFiLGFBQWE7NkJBVlUsSUFBSSxZQUFZLEVBQUU7S0FZcEQ7Ozs7O0lBdEJELE9BQU8sQ0FBQyxLQUFVO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztTQUNqQixDQUFDLENBQUM7S0FDTjs7Ozs7SUFLTyxNQUFNLENBQUMsS0FBVTs7UUFDckIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2QsSUFBSSxDQUFDO1lBQ0QsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFBQSxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQzs7OztZQXpCaEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7YUFDOUI7Ozs7WUFKUSxvQkFBb0I7OztzQkFTeEIsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzRCQVV6QyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSxcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2l6YXJkLXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3dpemFyZFN0b3JhZ2VdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV2l6YXJkU3RvcmFnZURpcmVjdGl2ZSB7XHJcblxyXG4gICAgLy8gV2lsbCBsaXN0ZW4gdG8gbG9jYWxTdG9yYWdlIGNoYW5nZXMgbWFkZVxyXG4gICAgLy8gYnkgb3RoZXIgYXBwbGljYXRpb25zLlxyXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnN0b3JhZ2UnLCBbJyRldmVudCddKVxyXG4gICAgb25Ib3ZlcihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy53aXphcmRTdG9yYWdlLmVtaXQoe1xyXG4gICAgICAgICAgICBrZXk6IGV2ZW50LmtleSxcclxuICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMudG9Kc29uKGV2ZW50Lm9sZFZhbHVlKSxcclxuICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMudG9Kc29uKGV2ZW50Lm5ld1ZhbHVlKSxcclxuICAgICAgICAgICAgdXJsOiBldmVudC51cmxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHdpemFyZFN0b3JhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHByaXZhdGUgdG9Kc29uKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgeCA9IHZhbHVlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHggPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICB9Y2F0Y2goZSl7fVxyXG4gICAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmRTZXJ2aWNlOiBXaXphcmRTdG9yYWdlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG59Il19