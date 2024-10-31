import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComplexBoxComponent } from '../complex-box/complex-box.component';

@Component({
  selector: 'app-scrollable-view-pane',
  standalone: true,
  imports: [],
  templateUrl: './scrollable-view-pane.component.html',
  styleUrl: './scrollable-view-pane.component.css'
})
export class ScrollableViewPaneComponent {
  
  childComponents: ComponentType<any>[] = [ComplexBoxComponent];
  @Output() childData = new EventEmitter<any>();
}
