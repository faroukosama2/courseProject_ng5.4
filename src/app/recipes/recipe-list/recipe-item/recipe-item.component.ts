import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeEl') recipe:Recipe;
  @Input('recipeElId') recipeId:number;
  constructor() { }

  ngOnInit() {
  }

}
