import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadAnimateComponent} from './load-animate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadAnimateComponent],
  exports:[LoadAnimateComponent]
})
export class LoadAnimateModule { }
