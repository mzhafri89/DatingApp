import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import authReducer from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';

@NgModule({
  declarations: [AuthLandingComponent, RegisterComponent, LoginRegisterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      { path: '', component: AuthLandingComponent },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
