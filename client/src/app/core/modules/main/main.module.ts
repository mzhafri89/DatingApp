import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLandingComponent } from './pages/main-landing/main-landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainLandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLandingComponent,
        children: [
          {
            path: 'list',
            loadChildren: () =>
              import('../../../feature/modules/list/list.module').then(
                (m) => m.ListModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class MainModule {}
