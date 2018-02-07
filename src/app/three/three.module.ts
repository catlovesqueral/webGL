import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeComponent } from './three.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ThreeComponent],
  exports:[ThreeComponent]
})
export class ThreeModule { }
