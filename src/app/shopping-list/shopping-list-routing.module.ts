import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";

const ShoppingListRoutes: Routes=[
    { path:'' , component:ShoppingListComponent}
];
    
@NgModule({
    imports:[RouterModule.forChild( ShoppingListRoutes ) ],
    exports:[RouterModule]
}) 
export class ShoppingListRoutingModule{}