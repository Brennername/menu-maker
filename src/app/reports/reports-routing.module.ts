import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuWeekComponent } from './menu-week/menu-week.component';
import { ViewReportComponent } from './view-report/view-report.component';

const routes: Routes = [
  {
    path: '',
    component: ViewReportComponent,
    pathMatch: 'full'
  },
  {
    path: 'menu-week',
    component: MenuWeekComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
