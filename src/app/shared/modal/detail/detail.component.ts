import { Component, OnInit, Inject } from '@angular/core';
import { BaseFormComponent } from '../../base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { RevendaService } from 'src/app/home/revendas/revenda.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseFormComponent implements OnInit {

  public license: string;
  public name: string;

  constructor(private formBuilder: FormBuilder,
              private revendaService: RevendaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DetailComponent>) { super(); }

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

    this.findConfig(this.data);

  }

  close = () => {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.formulario.value);
    this.revendaService.createConfig(this.formulario.value).subscribe(() => this.close());
  }


  findConfig = (data: any) => {
    console.log(data.revenda.id);
    this.revendaService.getConfiByIdRevenda(data.revenda.id)
      .subscribe((success: any) => { console.log(success); this.loadRevenda(success); });
  }

  loadRevenda = (data: any) => {
    this.formulario.get('revenda').patchValue({
      id: data.revenda.id,
      license: data.revenda.license,
      name: data.revenda.name,
      environment: data.revenda.environment,
      cnpj: data.revenda.cnpj
    });

    this.formulario.get('fila').patchValue({
      id: data.fila.id,
      username: data.fila.username,
      password: data.fila.password,
      portPainel: data.fila.portPainel,
      portTcp: data.fila.portTcp
    });
    this.formulario.get('database').patchValue({
      id: data.database.id,
      url: data.database.url,
      username: data.database.username,
      password: data.database.password,
      tablenName: data.database.tablenName,
      port: data.database.port
    });

    this.formulario.get('api').patchValue({
      id: data.api.id,
      port: data.api.port,
    });

    this.formulario.get('web').patchValue({
      id: data.web.id,
      hostApi: data.web.hostApi,
      host: data.web.host,
      port: data.web.port,
    });
  }

  check = () => {
    return this.formulario.get('fila').invalid ||
      this.formulario.get('web').invalid ||
      this.formulario.get('revenda').invalid ||
      this.formulario.get('api').invalid ||
      this.formulario.get('database').invalid;
  }

}
