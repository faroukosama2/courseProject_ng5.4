import { Component, OnInit } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe;
   recipeIndex:number;
   currentUserState:Promise<{}>;
   currentUserStateChangedSubscription:Subscription;
   recipeSubscription:Subscription;

  constructor(private recipeService:RecipeService,
  private route:ActivatedRoute,
  private router:Router,
  private authService:AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      ( params:Params) => {
          this.recipeIndex= +params['id']-1;
          this.recipe=this.recipeService.getRecipe(this.recipeIndex);
        }
    );
    this.recipeSubscription=this.recipeService.recipesChanged.subscribe(
      () => {  this.recipe=this.recipeService.getRecipe(this.recipeIndex); }
    );


    this.currentUserState=this.authService.isAuthenticated();
    
    this.currentUserStateChangedSubscription=
      this.authService.currentUserStateChanged.subscribe(
        () => {
          this.currentUserState=this.authService.isAuthenticated();
        }
    );

  }

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
  }
  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['recipes']);
  }

  ngOnDestroy(): void {
    this.currentUserStateChangedSubscription.unsubscribe();
    this.recipeSubscription.unsubscribe();
  }
  
}
