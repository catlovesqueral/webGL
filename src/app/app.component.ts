import { Component,OnInit } from '@angular/core';
import {ModelService} from './service/model.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  id:any;
  isLoading:boolean = true;
  constructor(
    private modelService: ModelService
  ) {
    this.modelService.isload$.subscribe(isload => {
            this.isLoading = isload;
        });
  }
  
  ngOnInit(){
  }
}
