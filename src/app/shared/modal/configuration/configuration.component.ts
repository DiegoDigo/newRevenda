import { RevendaService } from './../../../home/revendas/revenda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { BaseFormComponent } from '../../base-form/base-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseFormComponent implements OnInit {

  public license: string;
  public name: string;

  constructor(private formBuilder: FormBuilder,
              private revendaService: RevendaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConfigurationComponent>) { super(); }

  ngOnInit() {

    this.name = this.data.revenda.name;
    this.license = this.data.revenda.license;

    this.formulario = this.formBuilder.group({
      fila: this.formBuilder.group({
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        portPainel: [null, [Validators.required, Validators.pattern('[0-9]{4}'), Validators.maxLength(4)]],
        portTcp: [null, [Validators.required, Validators.pattern('[0-9]{5}'), Validators.maxLength(5)]]
      }),
      database: this.formBuilder.group({
        url: [null, [Validators.maxLength(50)]],
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        tablenName: [null, [Validators.maxLength(50), Validators.required]],
        port: [null, [Validators.maxLength(4), Validators.required, Validators.pattern('[0-9]{4}')]],
      }),
      api: this.formBuilder.group({
        port: [null, [Validators.maxLength(4), Validators.required, Validators.pattern('[0-9]{4}')]],
      }),
      web: this.formBuilder.group({
        hostApi: [null, [Validators.maxLength(50), Validators.required, Validators.pattern('[a-zA-Z]+\.com\.br\/[a-zA-z0-9]+')]],
        host: [null, [Validators.maxLength(50), Validators.required, Validators.pattern('[a-zA-Z]+\.com\.br')]],
        port: [null, [Validators.maxLength(4), Validators.required, Validators.pattern('[0-9]{2,4}')]],
      }),
      revenda: this.formBuilder.group({
        id: [null, [Validators.maxLength(50), Validators.required]],
        license: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]{4}')]],
        name: [null, [Validators.maxLength(50), Validators.required]],
        environment: [null, Validators.required],
        cnpj: [null, [Validators.required, Validators.maxLength(15)]]
      })
    });

    this.loadRevenda();

  }

  close = () => {
    this.dialogRef.close();
  }

  submit() {
    this.revendaService.createConfig(this.formulario.value).subscribe(() => this.close());
  }


  loadRevenda = () => {
    this.formulario.get('revenda').patchValue({
      id: this.data.revenda.id,
      license: this.data.revenda.license,
      name: this.data.revenda.name,
      cnpj: this.data.revenda.cnpj,
      environment: this.data.revenda.environment
    });
  }

  check = () => {
    return this.formulario.get('fila').invalid ||
     this.formulario.get('web').invalid ||
     this.formulario.get('api').invalid ||
     this.formulario.get('database').invalid;
  }
}
