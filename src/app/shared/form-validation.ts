export class FormValidation {



  static getErrorMsg(fieldname: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldname} é obrigatorio.`,
      'minlength': `${fieldname} precisa ter no minimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldname} precisa ter no maximo ${validatorValue.requiredLength} caracteres.`,
      'email': `${fieldname} é invalido.`,
      'pattern': `${fieldname} é invalido.`,
      'cpfInvalido': `${fieldname} é invalido.`,
      'cnpjInvalido': `${fieldname} é invalido.`,
      'exist': `${fieldname} já cadastrado.`,
    };
    return config[validatorName];
  }

}
