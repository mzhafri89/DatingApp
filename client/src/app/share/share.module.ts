import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownDirective } from './directives/dropdown.directive';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [DropdownDirective],
  imports: [CommonModule, HttpClientModule, NgxGalleryModule],
  exports: [DropdownDirective, NgxGalleryModule],
})
export class ShareModule {}
