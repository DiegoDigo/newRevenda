import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ErrorFieldComponent } from './error-field/error-field.component';
import { ConfigurationComponent } from './modal/configuration/configuration.component';
import { DetailComponent } from './modal/detail/detail.component';
import { RevendaComponent } from './modal/revenda/revenda.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    RevendaComponent,
    ErrorFieldComponent,
    ConfigurationComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    SidebarComponent,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule,
    RevendaComponent,
    ErrorFieldComponent,
    ConfigurationComponent,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    RevendaComponent,
    ConfigurationComponent,
    DetailComponent
  ],
})
export class SharedModule { }
