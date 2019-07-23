import { RevendasComponent } from './revendas/revendas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './home/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: '', component: RevendasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
