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
        id: [null, [Validators.maxLength(50), Validators.required]],
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        portPainel: [null, Validators.required],
        portTcp: [null, Validators.required]
      }),
      database: this.formBuilder.group({
        id: [null, [Validators.maxLength(50), Validators.required]],
        url: [null, [Validators.maxLength(50)]],
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        tablenName: [null, [Validators.maxLength(50), Validators.required]],
        port: [null, [Validators.maxLength(4), Validators.required]],
      }),
      api: this.formBuilder.group({
        id: [null, [Validators.maxLength(50), Validators.required]],
        port: [null, [Validators.maxLength(4), Validators.required]],
      }),
      web: this.formBuilder.group({
        id: [null, [Validators.maxLength(50), Validators.required]],
        hostApi: [null, [Validators.maxLength(50), Validators.required]],
        host: [null, [Validators.maxLength(50), Validators.required]],
        port: [null, [Validators.maxLength(4), Validators.required]],
      }),
      revenda: this.formBuilder.group({
        id: [null, [Validators.maxLength(50), Validators.required]],
        license: [null, [Validators.maxLength(50), Validators.required]],
        name: [null, [Validators.maxLength(50), Validators.required]],
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
    this.revendaService.getConfiByIdRevenda(data.revenda.id).subscribe((success: any) => { console.log(success) ;this.loadRevenda(success);});
  }

  loadRevenda = (data: any) => {
    this.formulario.get('revenda').patchValue({
      id: data.revenda.id,
      license: data.revenda.license,
      name: data.revenda.name
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

}
