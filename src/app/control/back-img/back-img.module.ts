import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackImgComponent } from './back-img.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BackImgComponent],
  exports:[BackImgComponent]
})
export class BackImgModule { }
