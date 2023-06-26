import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginRegisterFormData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css'],
})
export class LoginRegisterFormComponent implements OnInit {
  //@ts-ignore
  form: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  @Input() mode: 'login' | 'register' = 'login';
  @Output() onSubmit: EventEmitter<LoginRegisterFormData> = new EventEmitter();

  submit() {
    this.onSubmit.emit({
      username: this.form.value.username!,
      password: this.form.value.password!,
    });
  }

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
}
