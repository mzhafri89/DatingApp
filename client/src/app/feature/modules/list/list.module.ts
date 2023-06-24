import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLandingComponent } from './pages/list-landing/list-landing.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [ListLandingComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: ListLandingComponent }]),
  ],
})
export class ListModule {}
