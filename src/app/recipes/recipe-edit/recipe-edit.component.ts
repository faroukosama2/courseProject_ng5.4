import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editedRecipeIndex:number;
  editMode:boolean=false;
  recipeForm: FormGroup;

  constructor(private route:ActivatedRoute,
  private recipeService:RecipeService,
  private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      ( params:Params ) => {  
        this.editMode = params['id']!=null;
        if(this.editMode)
          this.editedRecipeIndex=params['id']-1;
        this.initForm();
      }
    );
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )

  }

  onSubmit()
  {
    const value=this.recipeForm.value;
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.editedRecipeIndex,value);
      this.router.navigate(['recipes',this.editedRecipeIndex+1]);
    }
    else
    {
      const newIndex=this.recipeService.addRecipe(value)+1;
      this.router.navigate(['recipes',newIndex]);
    }

  }
  onCancelIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancelRecipe()
  {
      this.router.navigate(['../'],{relativeTo: this.route});
  }
  private initForm()
  {
    let recipeName ='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    
    if(this.editMode)
    {
      const editedrecipe =this.recipeService.getRecipe(this.editedRecipeIndex);
      recipeName= editedrecipe.name;
      recipeImagePath= editedrecipe.imagePath;
      recipeDescription=editedrecipe.description;   
      for(let ingredient of editedrecipe.ingredients)
      {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name,Validators.required),
        'amount': new FormControl( ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]) 
        }));
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'imagePath':  new FormControl(recipeImagePath,Validators.required),
      'ingredients': recipeIngredients
    });

  }

  getRecipeFormIngredientControls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }
}
