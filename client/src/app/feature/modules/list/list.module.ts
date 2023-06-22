import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLandingComponent } from './pages/list-landing/list-landing.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListLandingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: ListLandingComponent }]),
  ],
})
export class ListModule {}
