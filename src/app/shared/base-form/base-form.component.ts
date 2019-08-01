import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Utility } from '../utility';


@Injectable()
export abstract class BaseFormComponent {

  formulario: FormGroup;

  constructor() { }

  abstract submit();

  onSubmit = () => {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.sharedError(this.formulario);
    }
  }

  resetar = () => {
    this.formulario.reset();
  }

  private sharedError = (formGruop: FormGroup | FormArray) => {
    Object.keys(formGruop.controls).forEach(campo => {
      const control = this.formulario.get(campo);
      control.markAsTouched();
      control.markAsDirty();
      control.markAllAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.sharedError(control);
      }
    });
  }

  verificaValidTouched = (campo) => {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro = (campo) => {
    return {
      'has-danger': this.verificaValidTouched(campo),
      'is-invalide': this.verificaValidTouched(campo),
      'is-valide': !this.verificaValidTouched(campo)
    };

  }

  showNotification(type: string, title: string, msg: string, icon: string) {
    Utility.notification(type, title, msg, icon);
  }



}
