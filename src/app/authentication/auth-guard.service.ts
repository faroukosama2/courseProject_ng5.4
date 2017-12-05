import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "app/authentication/authentication.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate ,CanLoad
{

    constructor(private authService:AuthenticationService,
                private router:Router){}

    canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(route.url[0].path=='signin' || route.url[0].path=='signup')
        {
            return this.authService.isAuthenticated().then(
                (auth:boolean) => {
                    if(auth)
                    {
                        this.router.navigate(['/']);
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            );

        }
        else
        {
            return this.authService.isAuthenticated().then(
                (auth:boolean) => {
                    if(auth)
                        return true;
                    else{
                        this.router.navigate(['/']);
                        return false;
                    }
                }
            );

        }

    }



    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        if(route.path=='signin' || route.path=='signup')
        {
            return this.authService.isAuthenticated().then(
                (auth:boolean) => {
                    if(auth)
                    {
                        this.router.navigate(['/home']);
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            );

        }
        else
        {
            return this.authService.isAuthenticated().then(
                (auth:boolean) => {
                    if(auth)
                        return true;
                    else{
                        this.router.navigate(['/home']);
                        return false;
                    }
                }
            );

        }
    }



}