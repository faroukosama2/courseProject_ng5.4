import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules }  from "@angular/router"


import { HomeComponent } from "app/core/home/home.component";
import { PageNotFoundComponent } from "app/core/page-not-found/page-not-found.component";
import { AuthGuardService } from "app/authentication/auth-guard.service";


const AppRoutes: Routes=[
    { path:'' , redirectTo:'/home' ,pathMatch:'full' },
    { path:'home' , component:HomeComponent },   
    { path:'recipes' , loadChildren: './recipes/recipes.module#RecipesModule' },
    { path:'shopping-list' , loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    { path:'signup' , loadChildren: './authentication/authentication.module#AuthenticationModule', canLoad:[AuthGuardService] ,data:{ isSignup:true} },
    { path:'signin' , loadChildren: './authentication/authentication.module#AuthenticationModule', canLoad:[AuthGuardService] ,data:{ isSignup:false} },
    { path:'profile' , loadChildren: './authentication/profile.module#ProfileModule', canLoad:[AuthGuardService] },
    { path: 'not-found', component:PageNotFoundComponent },
    { path: '**', redirectTo:'/not-found'}
];

@NgModule({
    imports:[RouterModule.forRoot( AppRoutes , {preloadingStrategy:PreloadAllModules}) ],
    exports:[RouterModule]
})
export class AppRoutingModule{}