import { Component, OnInit  } from '@angular/core';
import { ModelService } from '../service/model.service';
import * as html2canvas from 'html2canvas';
// import * as setShareInfo from ''
declare var setShareInfo:any;

@Component({
  selector: 'control-module',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit{
    option = {
        moveCallBack: (values) => {
            //返回的是一个对象，里面有x和y两个属性。
            //      console.log("移动模型,左右移动:" + values.x + "前后移动:" + values.z)
            this.modelService.moveModel$.emit(values)
        },
    };
    Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
    isPC:boolean = true;
    funStart:any;
    funScale:any;
    touchStart:any;
    touchScale:any;
    renderList:any;
    modelInfo:any;
    colorSelect:any;
    canvasImg:any;
    // 控制是否显示弹出框页面
    isShowModel:boolean = false;
    // 控制是否弹出背景选择的弹出框
    isShowBack:boolean = false;
    // 控制是否显示背景图片
    isShowImg:boolean = true;
    // 控制顶部模型风格
    isShowStyle:boolean = false;
    // 控制加载界面显示隐藏
    isLoading:boolean = true;
    isMove:boolean = false;
    load:any = 0;;
    canvas:any = document.createElement("canvas"); 
    canvas2D:any;
    moveAroundXPos: number = 0;
    moveAroundZPos: number = 0;
    constructor(private modelService:ModelService){
        document.addEventListener('touchmove', (e:any) => {
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
          },false)
        this.modelService.backData$.subscribe(data=>{
            this.renderList=data.model;
            this.modelService.httpModel$.subscribe(id => {
                this.findModel(id);
                // console.log(this.modelInfo)
                setShareInfo({
                    title:          '五白家居',
                    summary:        this.modelInfo.style,
                    pic:            this.modelInfo.shareImg,
                    url:            window.location.href
                })
            })
        });
    }

    ngOnInit(){
        let userAgentInfo = navigator.userAgent;
        for (var v = 0; v < this.Agents.length; v++) {
            if (userAgentInfo.indexOf(this.Agents[v]) > 0) {  
                this.isPC = false;
                break;
            }
            else{
                this.isPC = true;
            }
          }
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight;
        this.canvas2D = this.canvas.getContext("2d");
    }
// 显示隐藏模型信息和模型选择页面
    showModelPage(e:any){
        // 是否显示模型信息页面
        if(this.isShowBack){
            this.isShowBack = false;
        }
        if(this.isShowModel){
            this.isShowModel = false;
        }
        else{
            this.isShowModel = true;
        }
        if(!this.modelService.ifOrbitControl){
            this.isMove = false;
            this.modelService.ifOrbitControl = true;
            document.removeEventListener('mousedown',this.funStart);
            document.removeEventListener('touchstart',this.touchStart);
        }
        
    }

    // 显示隐藏背景图片选择页面
    showBackPage(e:any){
        if(this.isShowModel){
            this.isShowModel = false;
        }
        if(this.isShowBack){
            this.isShowBack = false;
        }
        else{
            this.isShowBack = true;
        }
        if(!this.modelService.ifOrbitControl){
            this.isMove = false;
            this.modelService.ifOrbitControl = true;
            document.removeEventListener('mousedown',this.funStart);
            document.removeEventListener('touchstart',this.touchStart);
        
        }
    }

    //点击移动模型按钮，判定移动旋转模型 
    modelMove(e:any){
        this.isShowBack = false;
        this.isShowModel = false;
        if(this.isMove == false){
            this.isMove = true;
        }
        else{
            this.isMove = false;
            // this.modelService.changeOrbitCenter$.emit()
        }
        if(this.isMove){
            if(this.modelService.ifOrbitControl){
                this.modelService.ifOrbitControl = false;
                document.addEventListener('mousedown', this.funStart = (e:any) => {
                    this.moveAroundXPos = e.clientX;
                    this.moveAroundZPos = e.clientY;
                    document.addEventListener('mousemove', this.funScale=(e:any) => {
                        if (this.option != undefined) {
                        if (this.option.moveCallBack != undefined) {
                            let returnValue = {
                            x: e.clientX - this.moveAroundXPos,
                            y: this.moveAroundZPos - e.clientY
                            }
                            this.option.moveCallBack(returnValue);
                            }
                        }
                        this.moveAroundXPos = e.clientX;
                        this.moveAroundZPos = e.clientY;
                    })
                    document.addEventListener('mouseup',(e:any) => {
                        document.removeEventListener('mousemove',this.funScale);
                    })
                })
                document.addEventListener('touchstart',this.touchStart = (e:any) => {
                    this.moveAroundXPos = e.touches[0].clientX;
                    this.moveAroundZPos = e.touches[0].clientY;
                    document.addEventListener('touchmove', this.touchScale=(e:any) => {
                        if (e.cancelable) {
                            // 判断默认行为是否已经被禁用
                            if (!e.defaultPrevented) {
                                e.preventDefault();
                            }
                        }
                        if (this.option != undefined) {
                            if (this.option.moveCallBack != undefined) {
                            let returnValue = {
                                x: e.touches[0].clientX - this.moveAroundXPos,
                                y: this.moveAroundZPos - e.touches[0].clientY
                            }
                            this.option.moveCallBack(returnValue);
                            }
                        }
                        this.moveAroundXPos = e.touches[0].clientX;
                        this.moveAroundZPos = e.touches[0].clientY;
                    })
                    document.addEventListener('touchend',(e:any) => {
                        // document.removeEventListener('touchstart',this.funScale);
                        document.removeEventListener('touchmove',this.touchScale);
                    })
                })  
            }
        }
        else{
            document.removeEventListener('mousedown',this.funStart);
            document.removeEventListener('touchstart',this.touchStart);
            this.modelService.ifOrbitControl = true;
        }
    }

    // 点击复位模型按钮，复位模型
    backPosition(e:any){
        this.isShowBack = false;
        this.isShowModel = false;
        this.modelService.backPosition$.emit()
    }

    // 显示隐藏背景图片按钮，隐藏显示背景图片选择弹出框
    hiddenShowBack(e:any){
        if(this.isShowImg){
            this.isShowImg = false;
        }
        else{
            this.isShowImg = true;
        }
        this.modelService.isShowBackImg$.emit(this.isShowImg)
    }

    // 点击模型颜色更换模型材质
    changeColor(data:any){
        this.modelService.changeModelColor$.emit(data)
    }

    // 查找数据中模型位置
    private findModel(id:any){
        for(let i=0;i<this.renderList.length;i++){
            if(this.renderList[i].id == id){
                this.modelInfo = this.renderList[i];
                if(this.modelInfo.charlet){
                    this.colorSelect = this.modelInfo.charlet
                }
                this.isShowStyle = true;
            }
        }
    }
    newModel(id:any){
        window.location.href = 'http://www.3dhome360.com/modelShow/index.html?id=' + id;
        this.findModel(id);
    }
    // 下载图片到本地
    private downloadFile(filename, content) {
        var base64Img = content;
        var oA = document.createElement('a');
        oA.href = base64Img;
        oA.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        oA.dispatchEvent(event);
    }
    
    
    //保存本地图片 方法调用
    saveImgLocal() {
        // console.log(this.modelService.backCanvas)
        // console.log(this.modelService.threeCanvas)
        this.canvas2D.drawImage(this.modelService.backCanvas,0,0);
        this.canvas2D.drawImage(this.modelService.threeCanvas,0,0,this.modelService.threeCanvas.width,this.modelService.threeCanvas.height,0,0,this.canvas.width,this.canvas.height);
        this.canvasImg = this.canvas.toDataURL('image/png')
        this.downloadFile(this.modelInfo.name, this.canvasImg);
    }
}

