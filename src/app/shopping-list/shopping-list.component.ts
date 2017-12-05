import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from 'app/authentication/authentication.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[] ;
  private updateIngredientsubscription:Subscription
  currentUserState:Promise<{}>;
  currentUserStateChangedSubscription:Subscription;

  constructor(private shoppingListService:ShoppingListService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.ingredients=this.shoppingListService.getIngredients();
    this.updateIngredientsubscription=
      this.shoppingListService.ingrediantChanged.subscribe(
      ()=>{this.ingredients=this.shoppingListService.getIngredients();}
    );

    this.currentUserState=this.authService.isAuthenticated();
    
    this.currentUserStateChangedSubscription=
      this.authService.currentUserStateChanged.subscribe(
        () => {
          this.currentUserState=this.authService.isAuthenticated();
        }
    );
    
  }

  onEditItem(index: number)
  {
    this.currentUserState.then(
      (auth:boolean) => 
      {
        if(auth)
          this.shoppingListService.editIngredient.next(index);
      }
    ); 

  }

  ngOnDestroy(): void {
    this.updateIngredientsubscription.unsubscribe();
    this.currentUserStateChangedSubscription.unsubscribe();
  }

}
