import { RecipeService } from './../../recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipeitem',
  templateUrl: './recipeitem.component.html',
  styleUrls: ['./recipeitem.component.css']
})
/*
output parametresi kullanmak yerine, recipe.service.ts i kullanarak işlemlerimi yapacağım. 1 ve 2 nolu satırı bu yüzden yorumladım.
*/
export class RecipeitemComponent implements OnInit {
  @Input() recipe: Recipe;
  //1- @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected(){
    //2- this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);//3
    /*we can use this recipe selected event emitter and call emit and emit the recipe of this recipe item
    component because that is the one we selected and that's the data we want to pass. */
  }

}
