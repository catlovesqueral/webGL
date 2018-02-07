import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import {ThreeModule} from './three/three.module';
import {LoadAnimateModule} from './load-animate/load-animate.module';
import { ControlModule } from './control/control.module';
import { ModelService } from './service/model.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ThreeModule,
    ControlModule,
    LoadAnimateModule,
    HttpClientModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
