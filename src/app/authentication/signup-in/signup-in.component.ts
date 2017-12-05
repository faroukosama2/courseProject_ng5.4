import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';  
import { AuthenticationService } from 'app/authentication/authentication.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-signup-in',
  templateUrl: './signup-in.component.html',
  styleUrls: ['./signup-in.component.css']
})
export class SignupInComponent implements OnInit {
  signupMode:boolean;

  constructor(private authenticationService:AuthenticationService,
    private route:ActivatedRoute) { }

  ngOnInit() {

      this.route.data.subscribe(
        ( data:Data ) => {
          if(data['isSignup'])
            this.signupMode=true;
          else
            this.signupMode=false;
        }
      );
  }

  onSignUpIn(form: NgForm)
  {
    const email=form.value.email;
    const password=form.value.password;
    if(this.signupMode)
      this.authenticationService.signupUser(email,password);
    else
      this.authenticationService.signinUser(email,password);
  }

}
