import { Component } from '@angular/core';
import { WizardStorageService } from './wizard-storage/wizard-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wizard Storage';

  logger = [];

  constructor(private storage:WizardStorageService) {
    this.logger.push("==== SESSION STORAGE ====");

    this.storage.session.setItem("oneHourExpire", 5467, '12.4.3', 1);
    this.storage.session.setItem("neverExpire", {v: 3, k: 'uyu'}, '12.4.3');
    this.storage.session.setItem("expireImmediately", 'dfgdfg dgd gg', '12.4.3', 0);

    this.logger.push("all keys are: " + this.storage.session.getAllKeys());
    this.logger.push("oneHourExpire value for any version is: " + this.storage.session.getItem('oneHourExpire'));
    this.logger.push("oneHourExpire value for correct version is: " + this.storage.session.getItem('oneHourExpire', '12.4.3'));
    this.logger.push("oneHourExpire value for wrong version is: " + this.storage.session.getItem('oneHourExpire', 't'));

    this.logger.push("all keys are: " + this.storage.session.getAllKeys());
    this.logger.push("neverExpire value for any version is: " + JSON.stringify(this.storage.session.getItem('neverExpire')));
    this.logger.push("neverExpire value for correct version is: " + JSON.stringify(this.storage.session.getItem('neverExpire', '12.4.3')));
    this.logger.push("neverExpire value for wrong version is: " + this.storage.session.getItem('neverExpire', 't'));

    this.logger.push("all keys are: " + this.storage.session.getAllKeys());
    this.logger.push("expireImmediately value for any version is: " + this.storage.session.getItem('expireImmediately'));
    this.logger.push("expireImmediately value for correct version is: " + this.storage.session.getItem('expireImmediately', '12.4.3'));
    this.logger.push("expireImmediately value for wrong version is: " + this.storage.session.getItem('expireImmediately', 't'));
    this.logger.push("all keys are: " + this.storage.session.getAllKeys());


    this.logger.push("==== LOCAL STORAGE ====");

    this.storage.local.onchange('expireImmediately').subscribe(
      (success) => {
        if (success) {
          this.logger.push("key expireImmediately changed: " + JSON.stringify(success) );
        }
      }
    );
    this.storage.local.setItem("oneHourExpire", 5467, '12.4.3', 1);
    this.storage.local.setItem("neverExpire", {v: 3, k: 'uyu'}, '12.4.3');
    this.storage.local.setItem("expireImmediately", 'dfgdfg dgd gg', '12.4.3', 0);

    this.logger.push("all keys are: " + this.storage.local.getAllKeys());
    this.logger.push("oneHourExpire value for any version is: " + this.storage.local.getItem('oneHourExpire'));
    this.logger.push("oneHourExpire value for correct version is: " + this.storage.local.getItem('oneHourExpire', '12.4.3'));
    this.logger.push("oneHourExpire value for wrong version is: " + this.storage.local.getItem('oneHourExpire', 't'));

    this.logger.push("all keys are: " + this.storage.local.getAllKeys());
    this.logger.push("neverExpire value for any version is: " + JSON.stringify(this.storage.local.getItem('neverExpire')));
    this.logger.push("neverExpire value for correct version is: " + JSON.stringify(this.storage.local.getItem('neverExpire', '12.4.3')));
    this.logger.push("neverExpire value for wrong version is: " + this.storage.local.getItem('neverExpire', 't'));

    this.logger.push("all keys are: " + this.storage.local.getAllKeys());
    this.logger.push("expireImmediately value for any version is: " + this.storage.local.getItem('expireImmediately'));
    this.logger.push("expireImmediately value for correct version is: " + this.storage.local.getItem('expireImmediately', '12.4.3'));
    this.logger.push("expireImmediately value for wrong version is: " + this.storage.local.getItem('expireImmediately', 't'));
    this.logger.push("all keys are: " + this.storage.local.getAllKeys());
  }
}
