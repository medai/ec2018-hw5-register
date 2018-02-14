import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  retPassword: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }




  onSubmit() {
    if (this.password !==  this.retPassword) {
      this.flashMessage.show('enter the correct password in two fields', {
        cssClass: 'alert-danger',
        timeout: 4000
      });

    } else {
      this.authService.register(this.email, this.password)
        .then(res => {
          this.flashMessage.show('You are registered', {
            cssClass: 'alert-success',
            timeout: 4000
          });
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
        });
    }


  }

}
