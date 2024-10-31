import { ChangeDetectorRef, Component, ViewContainerRef, ViewRef } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DocketControlComponent } from './components/docket-control/docket-control.component';
import { WindowService } from './services/window.service';
import { WindowContainerComponent } from './components/window-container/window-container.component';
import { DashboardComponent } from './forms/dashboard/dashboard.component';
import { MenuComponent } from './forms/menu/menu.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { RequisitionsComponent } from './forms/requisitions/requisitions.component';
import { ReportsModule } from './reports/reports.module';
import { ViewReportComponent } from './reports/view-report/view-report.component';
import { InventoryComponent } from './forms/inventory/inventory.component';
import { ScrollableViewPaneComponent } from './components/scrollable-view-pane/scrollable-view-pane.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DocketControlComponent, WindowContainerComponent, DatePickerComponent, ScrollableViewPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ]
})
export class AppComponent {





  
  title = 'Menu Maker';
  name = 'Menu Maker';

  
   
constructor(private windowService: WindowService){}
 
  dockButtons = [
    { label: 'Dashboard', onClick: () => this.windowService.showWindow("Dashboard", DashboardComponent), isDisabled: false, position: "" },
    { label: 'Menu', onClick: () => this.windowService.showComponent(MenuComponent), isDisabled: false, position: "" },
    { label: 'Requisitions', onClick: () => this.windowService.showComponent(RequisitionsComponent), isDisabled: false, position: "" },
    { label: 'Inventory', onClick: () => this.windowService.showComponent(InventoryComponent), isDisabled:false, position: "" },
    { label: 'Reports', onClick: () => this.windowService.showComponent(ViewReportComponent), isDisabled:false, position: "" },
    // { label: 'ViewPane', onClick: () => this.windowService.showComponent(ScrollableViewPaneComponent), isDisabled:false, position: "" },

  ];
  ngOnInit() {

    
  }

  
}
