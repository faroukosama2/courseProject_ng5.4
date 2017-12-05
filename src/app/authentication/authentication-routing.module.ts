import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignupInComponent } from "app/authentication/signup-in/signup-in.component";



const authenticationRoutes: Routes=[
    { path:'' , component:SignupInComponent  },
    { path:'' , component:SignupInComponent  },
];
    
@NgModule({
    imports:[RouterModule.forChild( authenticationRoutes ) ],
    exports:[RouterModule]
})
export class AuthenticationRoutingModule{}