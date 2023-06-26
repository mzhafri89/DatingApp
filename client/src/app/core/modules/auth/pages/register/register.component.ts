import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginRegisterFormData } from '../../components/login-register-form/login-register-form.component';
import { register } from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private store: Store) {}

  submit(data: LoginRegisterFormData) {
    this.store.dispatch(register(data));
  }
}
