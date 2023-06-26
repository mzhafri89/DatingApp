import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';
import { LoginRegisterFormData } from '../../components/login-register-form/login-register-form.component';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css'],
})
export class AuthLandingComponent {
  constructor(private store: Store) {}

  submit(data: LoginRegisterFormData) {
    this.store.dispatch(login(data));
  }
}
