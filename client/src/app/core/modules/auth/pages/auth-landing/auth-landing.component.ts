import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';

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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    console.log(this.form.value);
    this.store.dispatch(
      login({
        username: this.form.value.username!,
        password: this.form.value.password!,
      })
    );
  }
}
