import { Component } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  providers: [AlertConfig, BsDatepickerConfig],
})
export class DatePickerComponent {
  minDate: Date = new Date("01-01-2001");
  maxDate: Date = new Date("12-31-2199");
  constructor(){}
  title = 'Menu Maker';

  selectedDate: Date = new Date();
ngOnInit() {
    
  this.selectedDate = new Date();
   
  
      
    }

      onTodayClicked() {
    this.selectedDate = new Date();
  }

}
