import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { ProfileComponent } from "app/authentication/profile/profile.component";
import { ProfileEditComponent } from "app/authentication/profile/profile-edit/profile-edit.component";
import { ProfileGuardService } from "app/authentication/profile-guard.service";


const profileRoutes: Routes=[
    { path:'' , component:ProfileComponent  ,children:[
        { path:'new' , component:ProfileEditComponent ,data:{ isNew:true},canActivate:[ProfileGuardService] ,canDeactivate:[ProfileGuardService]},
        { path:'edit' , component:ProfileEditComponent ,data:{ isNew:false} ,canDeactivate:[ProfileGuardService]},
    ]},
];
    
@NgModule({
    imports:[RouterModule.forChild( profileRoutes ) ],
    exports:[RouterModule]
})
export class ProfileRoutingModule{}