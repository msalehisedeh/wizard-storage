import { EventEmitter } from '@angular/core';
import { WizardStorageService } from './wizard-storage.service';
export declare class WizardStorageDirective {
    private wizardService;
    onHover(event: any): void;
    wizardStorage: EventEmitter<any>;
    private toJson(value);
    constructor(wizardService: WizardStorageService);
}
