import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  MatIconModule, MatDialogModule, MatTooltipModule, MatInputModule,
  MatRippleModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import { DashboardComponent } from './home/dashboard.component';
import { RevendasComponent } from './revendas/revendas.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    DashboardComponent,
    RevendasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,    
    NgxMaskModule.forRoot()

  ],
  exports: [RevendasComponent]
})
export class HomeModule { }
