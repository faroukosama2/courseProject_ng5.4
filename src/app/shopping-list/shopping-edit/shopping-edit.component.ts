import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  editSubscription:Subscription
  @ViewChild('form') shoppingListForm:NgForm;
  editMode=false;
  editedItemIndex:number;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
   this.editSubscription= this.shoppingListService.editIngredient.subscribe(
    (index:number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      const editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name:editedItem.name,
        amount:editedItem.amount
      });
    }
    );
  }

  onAddSaveItem()
  {
    const value =this.shoppingListForm.value;
    const ing=new Ingredient(value.name,value.amount);
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.editedItemIndex,ing);
      this.editMode=false;
    }
    else
    {
      this.shoppingListService.addIngredient(ing);
    }
    this.shoppingListForm.reset();
  }
  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear()
  {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

}
