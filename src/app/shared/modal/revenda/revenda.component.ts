import { RevendaService } from './../../../home/revendas/revenda.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BaseFormComponent } from '../../base-form/base-form.component';
import { take, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'app-revenda',
  templateUrl: './revenda.component.html',
  styleUrls: ['./revenda.component.scss']
})
export class RevendaComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevendaComponent>,
    private revendaService: RevendaService,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      license: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });

    this.formulario.get('license').statusChanges.pipe(
      take(30000),
      switchMap(status => status === 'VALID' ? this.revendaService.licenseExist(this.formulario.get('license').value) : empty())
    ).subscribe((dados: any) => {
      if (dados) {
        this.formulario.get('license').setErrors({ exist: true });
      }
    });

  }

  submit() {
    this.revendaService.create(this.formulario).subscribe(() => this.close());
  }

  close = () => {
    this.dialogRef.close();
  }

}
