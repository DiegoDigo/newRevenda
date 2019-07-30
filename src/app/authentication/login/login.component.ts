import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {


  public login = true;
  public loging = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authetication: AuthenticationService) {
    super();
  }

  ngOnInit() {

    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    } else {
      this.formulario = this.formBuilder.group({
        username: [null, [Validators.required, Validators.maxLength(50)]],
        password: [null, [Validators.required, Validators.maxLength(50)]]
      });
    }
  }


  submit() {
    this.authetication.login(this.formulario.value)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['home']);
      });

  }

}
