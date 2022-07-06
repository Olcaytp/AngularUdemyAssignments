import { AccountService } from './../accounts.service';
import { LoggingService } from './../logging.service';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers ın içinde AccountService vardı, onu kaldırdık çünkü app.component te oluşturlan instance ı kullanamıyorduk,
  // overwrite yaparak yeni instance oluşturuyorduk.appcomponentteki accountservice kullanılarak
  //oluşturulan instance ı bu sayede burada da kullanabildid.
  //providers ı burada commentlememizin sebebi appmodule dan çekecek olmamız.
  // providers: [LoggingService]
})
export class AccountComponent {

  @Input() account: {name: string, status: string};
  @Input() id: number;
  //Account.service.ts den dolayı bunlar iptal
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService,
              private accountService: AccountService) { }

  onSetTo(status: string) {
    //account.service.ts den dolayı emit iptal
    // this.statusChanged.emit({id: this.id, newStatus: status});
    //console.log('A server status changed, new status: ' + status);
    //loggingService accountService içinde kullanmak istiyoruz, o yüzden buradan kaldırıyoruz, accountService.ts de yeniden logging
    //service tanımlayacağız.
    // this.loggingService.logStatusChange(status);
    this.accountService.updateStatus(this.id, status);
    //here we are emitting event which lives in our service
    this.accountService.statusUpdated.emit(status);
    console.log("this.id ===="+this.id)
  }

}
