import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';
import { LoginRegisterFormData } from '../../components/login-register-form/login-register-form.component';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css'],
})
export class AuthLandingComponent implements OnInit {
  //@ts-ignore
  form: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // @ts-ignore
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit(data: LoginRegisterFormData) {
    this.store.dispatch(login(data));
  }
}
