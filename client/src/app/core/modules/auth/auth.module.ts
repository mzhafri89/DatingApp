import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthLandingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthLandingComponent }]),
  ],
})
export class AuthModule {}
