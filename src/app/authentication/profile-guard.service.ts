import { Injectable } from "@angular/core";
import { CanActivate,CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "app/authentication/authentication.service";

export interface CanProfileDeactivate {
    canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>
}

@Injectable()
export class ProfileGuardService implements CanActivate,CanDeactivate<CanProfileDeactivate>
{

    constructor(private authService:AuthenticationService,
       private router:Router){}
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(route.url[0].path=='new')
        {
            if(!this.authService.isnewUser)
                this.router.navigate(['/']);               
              
            return this.authService.isnewUser;
        }
        return false;
    }

    canDeactivate(component: CanProfileDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDeactivate();
    }


}