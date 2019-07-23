import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BaseFormComponent } from './base-form/base-form.component';



@NgModule({
  declarations: [
    SidebarComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule
  ],
  exports: [
    SidebarComponent,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule
  ],
})
export class SharedModule { }
