import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AuthenticationRoutingModule } from "app/authentication/authentication-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { SignupInComponent } from "app/authentication/signup-in/signup-in.component";



@NgModule({

  declarations: [
    SignupInComponent
  ],
  imports: [
    FormsModule,
    AuthenticationRoutingModule,
    SharedModule
  ]

})

export class AuthenticationModule { }
