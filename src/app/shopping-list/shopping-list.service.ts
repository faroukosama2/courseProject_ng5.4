import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs/Subject';


export class ShoppingListService {
  private ingredients:Ingredient[] =[
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',10)
  ];
  ingrediantChanged =new Subject<void>();
  editIngredient =new Subject<number>();
  constructor() { }

  setIngredients(ingredients:Ingredient[])
  {
    this.ingredients=ingredients;
    this.ingrediantChanged.next();
  }

  getIngredient(index:number)
  {
    return this.ingredients[index];
  }

  getIngredients()
  {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient)
  {
    //  this.ingredients.push(ingredient);
    this.pushIngredients(ingredient);
    this.ingrediantChanged.next();
  }
  addIngredients(ingredients:Ingredient[])
  {
    //this.ingredients.push(...ingredient);//... split array [1,2,3] to list 1,2,3
    this.pushIngredients(...ingredients);
    this.ingrediantChanged.next();
  }
  
  deleteIngredient(index:number)
  {
    this.ingredients.splice(index,1);
    this.ingrediantChanged.next();
  }

  updateIngredient(index:number,newIngredient:Ingredient)
  {
    this.ingredients[index]=newIngredient;
    this.ingrediantChanged.next();
  }

  private pushIngredients( ...ingredients:Ingredient[])
  {
    for(let ingredient of ingredients)
    {    
      const index =this.ingredients.findIndex(  item => item.name===ingredient.name );
      if(index!=-1)
        this.ingredients[index].amount+=ingredient.amount;
      else
        this.ingredients.push(ingredient);
    }
  }

  

}
