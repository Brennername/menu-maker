import { Component, Output } from '@angular/core';
import { ComplexBoxComponent } from "../../components/complex-box/complex-box.component";
import { ScrollableViewPaneComponent } from "../../components/scrollable-view-pane/scrollable-view-pane.component";
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-requisitions',
  standalone: true,
  imports: [ComplexBoxComponent, ScrollableViewPaneComponent],
  templateUrl: './requisitions.component.html',
  styleUrl: './requisitions.component.css'
})
export class RequisitionsComponent {



}
