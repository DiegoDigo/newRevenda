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

  public x: string;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ConfigurationComponent>) { super(); }

  ngOnInit() {

    this.x = this.data.revenda.name;

    this.formulario = this.formBuilder.group({
      fila: this.formBuilder.group({
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        portPainel: [null, Validators.required],
        portTcp: [null, Validators.required]
      }),
      database: this.formBuilder.group({
        url: [null, [Validators.maxLength(50)]],
        username: [null, [Validators.maxLength(50), Validators.required]],
        password: [null, [Validators.maxLength(50), Validators.required]],
        tablenName: [null, [Validators.maxLength(50), Validators.required]],
        port: [null, [Validators.maxLength(4), Validators.required]],
      }),
      api: this.formBuilder.group({
        port: [null, [Validators.maxLength(4), Validators.required]],
      }),
      web: this.formBuilder.group({
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

    this.loadRevenda();

    console.log(this.formulario.value);
  }

  close = () => {
    this.dialogRef.close();
  }

  submit() {
    throw new Error("Method not implemented.");
  }


  loadRevenda = () => {
    this.formulario.get('revenda').patchValue({
      id: this.data.revenda.id,
      license: this.data.revenda.license,
      name: this.data.revenda.name
    });
  }
}
