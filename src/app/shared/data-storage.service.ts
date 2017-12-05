import { Http ,Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "app/recipes/recipe.service";
import { Recipe } from "app/recipes/recipe.model";
import  "rxjs/Rx";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Ingredient } from "app/shared/ingredient.model";
import { AuthenticationService } from "app/authentication/authentication.service";
@Injectable()
export class DataStorageService{

    constructor(private http: Http,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthenticationService    ){}


    private storeRecipes(queryParams:string)
    {
        return this.http.put('https://courseproject-recipe-book.firebaseio.com/recipes.json'+queryParams, this.recipeService.getRecipes()).subscribe(
            (response:Response) => { 
      
            }
          );
    }

    private storeIngredients(queryParams:string)
    {
        return this.http.put('https://courseproject-recipe-book.firebaseio.com/ingredients.json'+queryParams, this.shoppingListService.getIngredients()).subscribe(
            (response:Response) => { 
      
            }
          );
    }

    private getRecipes(queryParams:string)
    {
        this.http.get('https://courseproject-recipe-book.firebaseio.com/recipes.json'+queryParams)
        .map(
            (response:Response) => {
                
                const recipes:Recipe[] =response.json();
                for (let recipe of recipes)
                {
                    if(!recipe['ingredients'])
                    {
                        recipe['ingredients']=[];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                
                this.recipeService.setRecipes(recipes);
            }
        );
    }

    private getIngredients(queryParams:string)
    {
        this.http.get('https://courseproject-recipe-book.firebaseio.com/ingredients.json'+queryParams)
        .map(
            (response:Response) => {
                const ingredients:Ingredient[] =response.json();
                return ingredients;
            }
        )
        .subscribe(
            (ingredients: Ingredient[]) => {
                
                this.shoppingListService.setIngredients(ingredients);
            }
        );
    }

    storeData()
    {
        this.authService.getToken().then(
            (currentUserToken:string) => {
                
                this.storeRecipes('?auth='+currentUserToken);
                this.storeIngredients('?auth='+currentUserToken);
                
            }
        );

    }

    getData()
    {
        this.authService.getToken().then(
            (currentUserToken:string) => {

                this.getRecipes('?auth='+currentUserToken);
                this.getIngredients('?auth='+currentUserToken);
                
            }
        );

    }

} 