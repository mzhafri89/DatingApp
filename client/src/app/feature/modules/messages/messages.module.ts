import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessagesLandingComponent } from './pages/messages-landing/messages-landing.component';

@NgModule({
  declarations: [MessagesLandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessagesLandingComponent,
      },
    ]),
  ],
})
export class MessagesModule {}
