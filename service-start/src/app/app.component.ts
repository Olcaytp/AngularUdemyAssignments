import { AccountService } from './accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers ı en yüksek merkezi componentten(app.module.ts) kullanmak için burdan kaldırıyoruz.appmodule.ts teki providers a ekliyoruz
  //providers: [AccountService]
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
this.accounts = this.accountService.accounts;
  }


  // onAccountAdded(newAccount: {name: string, status: string}) {
  //   this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: {id: number, newStatus: string}) {
  //   this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }
  //Account.service.ts i eklediğimiz için burada artık bunlara ihtiyacımız yok.

}
