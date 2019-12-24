import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageService } from './wizard-storage.service';
import { WizardStorageDirective } from './wizard-storage.directive';
var WizardStorageModule = /** @class */ (function () {
    function WizardStorageModule() {
    }
    WizardStorageModule_1 = WizardStorageModule;
    WizardStorageModule.forRoot = function () {
        return {
            ngModule: WizardStorageModule_1,
            providers: [
                WizardStorageService
            ]
        };
    };
    var WizardStorageModule_1;
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
    return WizardStorageModule;
}());
export { WizardStorageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0b3JhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3dpemFyZC1zdG9yYWdlLyIsInNvdXJjZXMiOlsic3JjL2FwcC93aXphcmQtc3RvcmFnZS93aXphcmQtc3RvcmFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWlCcEU7SUFBQTtJQVNBLENBQUM7NEJBVFksbUJBQW1CO0lBQ3ZCLDJCQUFPLEdBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFtQjtZQUM3QixTQUFTLEVBQUU7Z0JBQ1Qsb0JBQW9CO2FBQ3JCO1NBQ0YsQ0FBQTtJQUNILENBQUM7O0lBUlUsbUJBQW1CO1FBZi9CLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWixzQkFBc0I7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asc0JBQXNCO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFlBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNsQyxDQUFDO09BQ1csbUJBQW1CLENBUy9CO0lBQUQsMEJBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgV2l6YXJkU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3dpemFyZC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXaXphcmRTdG9yYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi93aXphcmQtc3RvcmFnZS5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFdpemFyZFN0b3JhZ2VEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFdpemFyZFN0b3JhZ2VEaXJlY3RpdmVcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBXaXphcmRTdG9yYWdlU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaXphcmRTdG9yYWdlTW9kdWxlIHsgXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogV2l6YXJkU3RvcmFnZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgV2l6YXJkU3RvcmFnZVNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=