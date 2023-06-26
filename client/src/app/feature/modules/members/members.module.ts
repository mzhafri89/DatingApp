import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MemberListComponent } from './pages/member-list/member-list.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';

@NgModule({
  declarations: [MemberListComponent, MemberDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: ':id',
        component: MemberDetailComponent,
      },
    ]),
  ],
})
export class MembersModule {}
