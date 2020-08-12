import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-side-item-fries',
  templateUrl: './side-item-fries.component.html',
  styleUrls: ['../side-item.component.css']
})
export class SideItemFriesComponent implements OnInit {

  name = "Fries";

  desc = "This is a fries description.";

  image = "";

  friesSelected: boolean = true;

  friesReveal: boolean = false;

  options = [
    {
      id: 1,
      name: "Small"
    },
    {
      id: 2,
      name: "Large"
    }
  ];

  optionsName: string = "Size";

  optionSelected;

  optionSelectedFormatted = {
    name: this.name,
    option: this.optionSelected
  }

  @Output() emitToParent = new EventEmitter();

  // format the option selected by the user
  formatSelected() {
    this.optionSelectedFormatted.option = this.optionSelected.name
  }

  // send the selected to the parent
  sendToParent() {
    this.reveal();
    this.formatSelected();
    this.emitToParent.emit(this.optionSelectedFormatted);
  }

  // reveals the options for the side and a button to select the side
  reveal() {
    this.friesReveal= !this.friesReveal;
  }
  
  // for testing
  log(x) {      
    console.log(x)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
