import { Injectable} from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  private recipes:Recipe[] =[
    new Recipe('Testy Schnitzel',
    'A super-tasty Schnitzel - just awesome!',
    'http://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG'
    ,[
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ]),
    new Recipe('Big Fat Burger'
    ,'What else you need to say?'
    ,'http://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg'
    ,[
      new Ingredient('Buns',2),
      new Ingredient('Meat',1),
    ])
  ];
  recipesChanged=new Subject<void>();

  constructor(private shoppingListService:ShoppingListService) { }
  
  setRecipes(recipes:Recipe[])
  {
    this.recipes=recipes;
    this.recipesChanged.next();
  }

  getRecipes()
  {
    return this.recipes.slice();//return a copy
  }

  getRecipe(index:number)
  {
    return this.recipes[index]
  }
  addRecipe(newRecipe:Recipe)
  {
    this.recipes.push(newRecipe);
    this.recipesChanged.next();
    return this.recipes.length-1;
  }
  updateRecipe(index:number,newRecipe:Recipe)
  {
    this.recipes[index]=newRecipe;
    this.recipesChanged.next();
  }
  deleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.recipesChanged.next();
  }
  addIngredientsToShopingList(ingredients:Ingredient[])
  {
  this.shoppingListService.addIngredients(ingredients);
  }
}
