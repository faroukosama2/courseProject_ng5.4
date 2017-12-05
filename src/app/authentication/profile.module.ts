import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ProfileRoutingModule } from "app/authentication/profile-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { ProfileComponent } from "app/authentication/profile/profile.component";
import { ProfileEditComponent } from "app/authentication/profile/profile-edit/profile-edit.component";
import { ProfileGuardService } from 'app/authentication/profile-guard.service';



@NgModule({

  declarations: [
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers: [ 
    ProfileGuardService 
  ]

})

export class ProfileModule { }
