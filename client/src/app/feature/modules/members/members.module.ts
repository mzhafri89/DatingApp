import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MemberListComponent } from './pages/member-list/member-list.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShareModule,
    RouterModule.forChild([
      {
        path: ':username',
        component: MemberDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
    ]),
  ],
})
export class MembersModule {}
