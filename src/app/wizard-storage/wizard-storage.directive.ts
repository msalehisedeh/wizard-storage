import {
    Directive,
    Input,
    Output,
    HostListener,
    EventEmitter
} from '@angular/core';

import { WizardStorageService } from './wizard-storage.service';

@Directive({
    selector: '[wizardStorage]'
})
export class WizardStorageDirective {

    // Will listen to localStorage changes made
    // by other applications.
    @HostListener('window:storage', ['$event'])
    onHover(event: any) {
        this.wizardStorage.emit({
            key: event.key,
            oldValue: this.toJson(event.oldValue),
            newValue: this.toJson(event.newValue),
            url: event.url
        });
    }

    @Output()
    wizardStorage: EventEmitter<any> = new EventEmitter();

    private toJson(value: any) {
        let x = value;
        try {
            x = JSON.parse(value);
        }catch(e){}
        return x;
    }
    constructor(
        private wizardService: WizardStorageService
    ) {
    }

}