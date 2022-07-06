import { AccountService } from './../accounts.service';
import { Component} from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers ı appmodulden çekerek kullanacağız, o yüzden burdakini siliyoruz.
  // providers: [LoggingService]
})
export class NewAccountComponent{

  //Account.service.ts den dolayı artık  herhangi bir eventi dinlemiyoruz.import tan output ile eventemitter ı da attık
  //Bunların yerine service i inject ederiz
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {
                //with this we listening the even emitter and because of the event emitter is observable we subscribed it.
                this.accountService.statusUpdated.subscribe(
                  (status: string) => alert('new status: ==> ' + status)
                );
               }

  //Account.service ten dolayı bunlarla işimiz kalmıyor
  onCreateAccount(accountName: string, accountStatus: string) {
  //   this.accountAdded.emit({
  //     name: accountName,
  //     status: accountStatus
  //   });
    // const service = new LoggingService();
    //service.logStatusChange(accountStatus);
    //console.log('A server status changed, new status: ' + accountStatus);
    //üst 2 satır -----this.loggingService.logStatusChange(accountStatus);----- aynı anlamdadır.
     this.loggingService.logStatusChange(accountStatus);
     //loggingService accountService içinde kullanmak istiyoruz,o yüzden buradan kaldırıyoruz, accountService.ts de yeniden logging
    //service tanımlayacağız.
     this.accountService.addAccount(accountName, accountStatus);
    // }
  }
}
