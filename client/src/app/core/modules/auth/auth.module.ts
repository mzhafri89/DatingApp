import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';

@NgModule({
  declarations: [AuthLandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthLandingComponent }]),
  ],
})
export class AuthModule {}
