import { Injectable,EventEmitter,OnInit } from '@angular/core';
import {URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";

import {Http} from '@angular/http';
import '../../../node_modules/rxjs/add/operator/toPromise';
import { last } from '@angular/router/src/utils/collection';

@Injectable()
export class ModelService {
  title:any;
  backCanvas = null;
  threeCanvas = null;
  ifOrbitControl:boolean = true;
  private dataJsonUrl = './assets/model.json';
  constructor(private http:Http) {
    let dataUrl = 'http://www.3dhome360.com/modelShow/assets/model.json';
    let params = new URLSearchParams();
    http.get(this.dataJsonUrl).map(rsp=>rsp.json()).subscribe(data=>{
      this.backData$.emit(data);
      // window.getSelection().removeAllRanges();
      let url = window.location.href;
      // alert(url);
      let modelID = this.getID(url);
      // alert(modelID)
      this.httpModel$.emit(modelID);
    });
   }
   ngOnInit(){
     
   }
// 数据请求成功后的订阅
  httpModel$:EventEmitter<any> = new EventEmitter<any>();
  // 请求背景图片的订阅
 backData$:EventEmitter<any> = new EventEmitter<any>();
//  移动模型的订阅
 moveModel$:EventEmitter<any> = new EventEmitter<any>();
//  模型复位的订阅
 backPosition$:EventEmitter<any> = new EventEmitter<any>();
// 是否显示背景图片
 isShowBackImg$:EventEmitter<any> = new EventEmitter<any>();
//  切换模型材质
 changeModelColor$:EventEmitter<any> = new EventEmitter<any>();

// //  调整orbit中心
// changeOrbitCenter$:EventEmitter<any> = new EventEmitter<any>();
// getCanvasContent$:EventEmitter<any> = new EventEmitter<any>();

 loading$:EventEmitter<any> = new EventEmitter<any>();
 isload$:EventEmitter<any> = new EventEmitter<any>();
  
  getID(url:string){
    if(url.indexOf('id') > 0 && url.indexOf('?') > 0){
      let params = url.split('?')[1];
      let modelID = params.split('=')[1];
      if(modelID.indexOf('&') > 0){
        let lastID = modelID.split('&')[0];
        return lastID;
      }
      else{
        return modelID;
      }
    }
    else{
      // window.open('http://www.3dhome360.com/modelShow/index.html?id=S001')
      // window.location.href = url + "?id=S001";
      return 'S001'; 
    }
  }
  
}
