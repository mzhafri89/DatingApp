import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AuthModule } from './modules/auth/auth.module';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    AuthModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
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
          canActivate: [authGuard],
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
