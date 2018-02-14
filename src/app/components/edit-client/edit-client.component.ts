import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  currentId: string;
  disabledBalanceOnAdd: boolean = true;
  editClient: Client = {
    firstName:  '',
    lastName:   '',
    email:      '',
    phone:      '',
    balance:    0
  };

  @ViewChild("clientForm") form: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public flashMassage: FlashMessagesService,
    public clientService: ClientService
  ) { }

  ngOnInit() {

    this.currentId = this.route.snapshot.params.id;

    this.clientService.getClient(this.currentId).subscribe( date => {
      this.editClient = date;
      // console.log("this.editClient = ", this.editClient);
    }, error => {
      console.log(error);
    });

  }


  onSubmit() {

    if ( !this.form.valid ) {
      this.flashMassage.show("Please enter form", {
        timeout: 4000,
        cssClass: "alert-danger"
      });
    } else {
      // console.log(this.editClient);
      // console.log(`/client/${this.currentId}`);
      // edit client
      this.clientService.editClient(this.editClient);
      // Show message success
      this.flashMassage.show('Edit client success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate([`/client/${this.currentId}`]);
    }

  }


}
