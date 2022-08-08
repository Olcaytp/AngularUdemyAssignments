import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})

export class HeaderComponent{
  //we comment these lines bucause we no more use methots at the html file.
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  //   //console.log('feature name:'+feature);
  // }

}
