import { Component, OnInit  } from '@angular/core';
import 'rxjs/add/operator/switchMap';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Location } from '@angular/common';
import {Loading} from '../class/Loading.class';
import { ModelService } from '../service/model.service';

@Component({
  selector: 'load-module',
  templateUrl: './load-animate.component.html',
  styleUrls: ['./load-animate.component.css']
})
export class LoadAnimateComponent implements OnInit {
    canvasParam:any;
    // load:any;
    isLoading:boolean = true;
    Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
    isPC:Boolean = false;
    load:number = 0;
    constructor(private modelService:ModelService){
        this.modelService.loading$.subscribe(data => {
            this.load = data;
            if(this.isPC == false){
                this.canvasParam.para.degActive = data;
                this.canvasParam.drawCanvas();
            }
        })
        
    }
    ngOnInit(){
        
        let userAgentInfo = navigator.userAgent;
        for (var v = 0; v < this.Agents.length; v++) {
            if (userAgentInfo.indexOf(this.Agents[v]) > 0) {  
                this.isPC = false;
                this.init();
                break;
            }
            else{
                this.isPC = true;  
                let a = document.getElementById('loadCanvas')
                a.style.display = 'none'
            }
          }
        // console.log(this.isPC)
        // this.canvasParam.drawCanvas();
    }
    init(){
        this.canvasParam = new Loading({
            element:'loadCanvas',//canvas元素id
            degActive:0,//绘制角度
            // timer:0,//绘制时间
            lineWidth:5,//线宽
            lineBgColor:'#e2e2e2',//底圆颜色
            lineColor:'#e4393c',//动态圆颜色
            textColor:'#000',//文本颜色
            fontSize:20,//字体大小
            circleRadius:25//圆半径,
        });
    }
    


}
