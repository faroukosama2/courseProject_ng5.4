import { NgModule } from "@angular/core";

import { AppRoutingModule } from "app/app-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { HomeComponent } from "app/core/home/home.component";
import { HeaderComponent } from "app/core/header/header.component";
import { PageNotFoundComponent } from "app/core/page-not-found/page-not-found.component";
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { RecipeService } from 'app/recipes/recipe.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { AuthGuardService } from "app/authentication/auth-guard.service";



@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        PageNotFoundComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent       
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthenticationService,
        AuthGuardService
    ],
})

export class CoreModule{}