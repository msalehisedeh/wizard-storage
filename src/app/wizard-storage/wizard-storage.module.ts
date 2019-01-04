import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardStorageService } from './wizard-storage.service';
import { WizardStorageDirective } from './wizard-storage.directive';

@NgModule({
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
export class WizardStorageModule { }
