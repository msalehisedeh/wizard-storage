import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardStorageService } from './wizard-storage.service';

@NgModule({
  declarations: [
  ],
  exports: [
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
