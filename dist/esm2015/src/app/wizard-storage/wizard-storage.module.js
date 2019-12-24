var WizardStorageModule_1;
import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageService } from './wizard-storage.service';
import { WizardStorageDirective } from './wizard-storage.directive';
let WizardStorageModule = WizardStorageModule_1 = class WizardStorageModule {
    static forRoot() {
        return {
            ngModule: WizardStorageModule_1,
            providers: [
                WizardStorageService
            ]
        };
    }
};
WizardStorageModule = WizardStorageModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
            WizardStorageDirective
        ],
        exports: [
            WizardStorageDirective
        ],
        imports: [
            CommonModule
        ],
        providers: [
            WizardStorageService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], WizardStorageModule);
export { WizardStorageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFpQnBFLElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFtQjtJQUM5QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQW1CO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7YUFDckI7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFUWSxtQkFBbUI7SUFmL0IsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osc0JBQXNCO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asc0JBQXNCO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsWUFBWTtTQUNiO1FBQ0QsU0FBUyxFQUFFO1lBQ1Qsb0JBQW9CO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDbEMsQ0FBQztHQUNXLG1CQUFtQixDQVMvQjtTQVRZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vd2l6YXJkLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFdpemFyZFN0b3JhZ2VEaXJlY3RpdmUgfSBmcm9tICcuL3dpemFyZC1zdG9yYWdlLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgV2l6YXJkU3RvcmFnZURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgV2l6YXJkU3RvcmFnZURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFdpemFyZFN0b3JhZ2VTZXJ2aWNlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFdpemFyZFN0b3JhZ2VNb2R1bGUgeyBcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBXaXphcmRTdG9yYWdlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBXaXphcmRTdG9yYWdlU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==