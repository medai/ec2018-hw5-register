import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";

import { ClientService } from "../../services/client.service";

import { Router} from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disabledBalanceOnAdd: boolean = true;

  @ViewChild("clientForm") form: any;

  constructor(
    private clientService: ClientService,
    private flashMassage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.form);

  }

  onSubmit() {

    if ( !this.form.valid ) {
      this.flashMassage.show("Please enter form", {
        timeout: 4000,
        cssClass: "alert-danger"
      });
    } else {
      // Add new client
      this.clientService.newClient(this.client);
      // Show message success
      this.flashMassage.show('New client add success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate(['/']);
    }

  }



}
