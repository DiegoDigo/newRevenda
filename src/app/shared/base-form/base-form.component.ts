import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit() { }

  abstract submit();

  onSubmit = () => {
    console.log(this.formulario);
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

}
