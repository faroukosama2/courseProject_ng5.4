import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from 'app/authentication/authentication.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipes:Recipe[] ;
  recipeSubscription:Subscription;
  currentUserState:Promise<{}>;
  currentUserStateChangedSubscription:Subscription;

  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthenticationService) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
    this.recipeSubscription=this.recipeService.recipesChanged.subscribe(
      () => { this.recipes=this.recipeService.getRecipes(); }
    );

    this.currentUserState=this.authService.isAuthenticated();
    
    this.currentUserStateChangedSubscription=
      this.authService.currentUserStateChanged.subscribe(
        () => {
          this.currentUserState=this.authService.isAuthenticated();
        }
    );

  }

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
    this.currentUserStateChangedSubscription.unsubscribe();
  }
}
