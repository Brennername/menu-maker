import { Component } from '@angular/core';
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";
import { LinePickerComponent } from "../../components/line-picker/line-picker.component";
import { ComplexBoxComponent } from "../../components/complex-box/complex-box.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DatePickerComponent, LinePickerComponent, ComplexBoxComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
