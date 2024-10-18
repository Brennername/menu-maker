import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-docket-control',
  standalone: true,
  imports: [],
  templateUrl: './docket-control.component.html',
  styleUrl: './docket-control.component.css'
})
export class DocketControlComponent implements OnInit {
  @Input() buttons: { label: string; onClick: () => void; isDisabled: boolean; position: string; 
}[] = [];
  @Input() isVisible: boolean = true;
ngOnInit(): void
{
console.log("docket-control: got here 1");
  console.log("buttons: " + this.buttons );


  for (var i = 0; i < this.buttons.length; i++)
    {
      if (i == 0)
      {
        this.buttons[i].position = "left-button";
      }
      else if (i == this.buttons.length - 1)
      {
        this.buttons[i].position = "right-button";
      }
      else
      this.buttons[i].position = "inside-button"; 
    }

}
  constructor() { }
 
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  handleButtonClick(button: { label: string; onClick: () => void; isDisabled: boolean }) {
   /* console.log("got here 1");
    console.log("button: " + button);
    console.log("button.isDisabled: " + button.isDisabled);*/
    if (!button.isDisabled) {
      button.onClick();
    }
  }
}