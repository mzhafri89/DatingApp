import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AuthModule } from './modules/auth/auth.module';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forRoot(
      [
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
      ],
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [AuthModule],
})
export class CoreModule {}
