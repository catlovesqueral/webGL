import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlComponent } from './control.component';
import {BackImgModule} from './back-img/back-img.module'
// import {LoadAnimateModule} from './load-animate/load-animate.module'


@NgModule({
  imports: [
    CommonModule,
    BackImgModule,
    // LoadAnimateModule
  ],
  declarations: [ControlComponent],
  exports:[ControlComponent]
})
export class ControlModule { }
