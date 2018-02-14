import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import {ClientService} from "../../services/client.service";
import {Client} from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  currentId: string;
  currentClient: Client;
  editBalance: boolean = false;
  tempBalance: number;

  constructor(
    public rout: ActivatedRoute,
    public router: Router,
    public clientService: ClientService,
    public flashService: FlashMessagesService

  ) { }

  ngOnInit() {
    this.currentId = this.rout.snapshot.params.id;

    this.clientService.getClient(this.currentId).subscribe( date => {
      this.currentClient = date;
      // console.log("this.currentClient = ", this.currentClient);
      this.tempBalance = this.currentClient.balance;
    }, error => {
      console.log(error);
    });
  }

  // удаление КЛИЕНТА, передаем в сервис всего КЛИЕНТА
  delClient(currentClient: Client){
    this.clientService.deleteClient(currentClient);
    // Show message success
    this.flashService.show('Client was deleted', {
      cssClass: 'alert-danger',
      timeout: 4000
    });
    // Redirect
    this.router.navigate(['/']);
  }

  showBalanceBlock() {
    (!this.editBalance)
    ? this.editBalance = !this.editBalance
    : (this.tempBalance === this.currentClient.balance)? this.editBalance = !this.editBalance : (this.currentClient.balance = this.tempBalance, this.editBalance = !this.editBalance);
  }

  setBalance(balance) {
    this.currentClient.balance = parseInt(balance);
    this.clientService.editClient(this.currentClient);
    this.editBalance = !this.editBalance;
    // Show message success
    this.flashService.show('Client balance edited', {
      cssClass: 'alert-info',
      timeout: 4000
    });

  }

}
