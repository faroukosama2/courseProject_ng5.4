import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ShoppingListRoutingModule } from "app/shopping-list/shopping-list-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";


@NgModule({
   
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ]

})

export class ShoppingListModule { }