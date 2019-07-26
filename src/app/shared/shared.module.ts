import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RevendaComponent } from './modal/revenda/revenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFieldComponent } from './error-field/error-field.component';
import { ConfigurationComponent } from './modal/configuration/configuration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { DetailComponent } from './modal/detail/detail.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';



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
    MatSelectModule
  ],
  entryComponents: [
    RevendaComponent,
    ConfigurationComponent,
    DetailComponent
  ],
})
export class SharedModule { }
