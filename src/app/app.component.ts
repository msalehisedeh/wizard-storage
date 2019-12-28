import { Component } from '@angular/core';
import { WizardStorageService } from './wizard-storage/wizard-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Storage';

  logger = [];

  constructor(private storage:WizardStorageService) {}

  makeStorage() {
    this.logger.push({message: "==== COOKIES STORAGE ===="});
    this.logger.push({message: "'cookie 1' removed: ", value: this.storage.cookies.removeItem("cookie 1")});
    this.logger.push({message: "'cookie 1' removed: ", value: this.storage.cookies.removeItem("cookie 1")});

    this.storage.cookies.onchange('cookie 1').subscribe(
      (success) => {
        if (success) {
          this.logger.push({message: "key 'cookie 1' changed: ", value: success });
          this.logger.push({message: "'cookie 1' value is: ", value: this.storage.cookies.getItem('cookie 1')});
          this.logger.push({message: "all keys are: ", value: this.storage.cookies.getAllKeys()});
          this.storage.cookies.clear();
        }
      }
    );
    this.storage.cookies.setItem("cookie 1", {v: 3, k: 'uyu'});

    this.logger.push({message: "==== SESSION STORAGE ===="});

    this.storage.session.setItem("oneHourExpire", 5467, '12.4.3', 1);
    this.storage.session.setItem("neverExpire", {v: 3, k: 'uyu'}, '12.4.3');
    this.storage.session.setItem("expireImmediately", 'dfgdfg dgd gg', '12.4.3', 0);

    const defaultItem = this.storage.session.getItem("defaultItem", {isSecure: true, default: {min: 1, max: 10}});
    this.logger.push({
      message: "defaultItem: ",
      value: defaultItem
    });
    this.logger.push({
      message: "defaultItem2: ",
      value: this.storage.session.getItem("defaultItem",{isSecure: true})
    });
    this.storage.session.removeItem("defaultItem");

    this.logger.push({message: "all keys are: ", value: this.storage.session.getAllKeys()});
    this.logger.push({message: "oneHourExpire value for any version is: ", value: this.storage.session.getItem('oneHourExpire')});
    this.logger.push({message: "oneHourExpire value for correct version is: ", value: this.storage.session.getItem('oneHourExpire', '12.4.3')});
    this.logger.push({message: "oneHourExpire value for wrong version is: ", value: this.storage.session.getItem('oneHourExpire', 't')});

    this.logger.push({message: "all keys are: ", value: this.storage.session.getAllKeys()});
    this.logger.push({message: "neverExpire value for any version is: ", value: this.storage.session.getItem('neverExpire')});
    this.logger.push({message: "neverExpire value for correct version is: ", value: this.storage.session.getItem('neverExpire', '12.4.3')});
    this.logger.push({message: "neverExpire value for wrong version is: ", value: this.storage.session.getItem('neverExpire', 't')});

    this.logger.push({message: "all keys are: ", value: this.storage.session.getAllKeys()});
    this.logger.push({message: "expireImmediately value for any version is: ", value: this.storage.session.getItem('expireImmediately')});
    this.logger.push({message: "expireImmediately value for correct version is: ", value: this.storage.session.getItem('expireImmediately', '12.4.3')});
    this.logger.push({message: "expireImmediately value for wrong version is: ", value: this.storage.session.getItem('expireImmediately', 't')});
    this.logger.push({message: "all keys are: ", value: this.storage.session.getAllKeys()});


    this.logger.push({message: "==== LOCAL STORAGE ===="});

    this.storage.local.onchange('expireImmediately').subscribe(
      (success) => {
        if (success) {
          this.logger.push({message: "key expireImmediately changed: ", value: success });
        }
      }
    );
    this.storage.local.setItem("oneHourExpire", 5467, '12.4.3', 1);
    this.storage.local.setItem("neverExpire", {v: 3, k: 'uyu'}, '12.4.3');
    this.storage.local.setItem("expireImmediately", 'dfgdfg dgd gg', '12.4.3', 0);

    this.logger.push({message: "all keys are: ", value: this.storage.local.getAllKeys()});
    this.logger.push({message: "oneHourExpire value for any version is: ", value: this.storage.local.getItem('oneHourExpire')});
    this.logger.push({message: "oneHourExpire value for correct version is: ", value: this.storage.local.getItem('oneHourExpire', '12.4.3')});
    this.logger.push({message: "oneHourExpire value for wrong version is: ", value: this.storage.local.getItem('oneHourExpire', 't')});

    this.logger.push({message: "all keys are: ", value: this.storage.local.getAllKeys()});
    this.logger.push({message: "neverExpire value for any version is: ", value: this.storage.local.getItem('neverExpire')});
    this.logger.push({message: "neverExpire value for correct version is: ", value: this.storage.local.getItem('neverExpire', '12.4.3')});
    this.logger.push({message: "neverExpire value for wrong version is: ", value: this.storage.local.getItem('neverExpire', 't')});

    this.logger.push({message: "all keys are: ", value: this.storage.local.getAllKeys()});
    this.logger.push({message: "expireImmediately value for any version is: ", value: this.storage.local.getItem('expireImmediately')});
    this.logger.push({message: "expireImmediately value for correct version is: ", value: this.storage.local.getItem('expireImmediately', '12.4.3')});
    this.logger.push({message: "expireImmediately value for wrong version is: ", value: this.storage.local.getItem('expireImmediately', 't')});
    this.logger.push({message: "all keys are: ", value: this.storage.local.getAllKeys()});
  }


  storageChanged(event) {
    this.logger.push({message: 'Storage changed by external application: ', value: event});
  }
}
