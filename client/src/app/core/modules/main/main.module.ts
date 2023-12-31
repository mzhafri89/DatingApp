import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLandingComponent } from './pages/main-landing/main-landing.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [MainLandingComponent],
  imports: [
    CommonModule,
    ShareModule,
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
          {
            path: 'members',
            loadChildren: () =>
              import('../../../feature/modules/members/members.module').then(
                (m) => m.MembersModule
              ),
          },
          {
            path: 'messages',
            loadChildren: () =>
              import('../../../feature/modules/messages/messages.module').then(
                (m) => m.MessagesModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class MainModule {}
