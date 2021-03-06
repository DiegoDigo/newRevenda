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


  public environments: any[] = [
    {value: 'DEVELOP', viewValue: 'Desenvolvimento'},
    {value: 'PRODUCTION', viewValue: 'Produção'},
    {value: 'QA', viewValue: 'Qualidade (QA)'}
  ];

  constructor(
    public dialogRef: MatDialogRef<RevendaComponent>,
    private revendaService: RevendaService,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      license: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]{4}')]],
      name: [null, [Validators.required]],
      environment: [null, Validators.required],
      cnpj: [null, [Validators.required, Validators.maxLength(15)]]
    });

    this.formulario.get('license').statusChanges.pipe(
      take(3000),
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
