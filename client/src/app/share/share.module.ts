import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [DropdownDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [DropdownDirective],
})
export class ShareModule {}
