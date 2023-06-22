import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./modules/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
      { path: '**', redirectTo: 'error' },
    ]),
  ],
  exports: [AuthModule],
})
export class CoreModule {}
