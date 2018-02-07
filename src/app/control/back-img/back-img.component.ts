import { Component,OnInit,Input } from '@angular/core';
import { ModelService } from '../../service/model.service'

@Component({
  selector: 'back-module',
  templateUrl: './back-img.component.html',
  styleUrls: ['./back-img.component.css']
})
export class BackImgComponent implements OnInit {
  /**=存放背景图数据==**/
  renderImg:any[]=[];
  @Input() isShowBack:boolean = false;
  pic:any;
  path:any;
  backCanvas:any;
  context2D:any;
  //画布移动的参数
  backCanvasMoveOption:any = {
    sx: 0, sy: 0,
    swidth: 0, sheight: 0,
    x: 0, y: 0,
    width: 0, height: 0,
    maxZoom: 5, minZoom: 1, zoom: 1,
    oWidth: 0, oHeight: 0, orientation: 1
  }
  constructor(private modelService:ModelService){
    this.modelService.backData$.subscribe((data:any)=>{
      this.renderImg=data.backImg;
      this.imgStart()
    });
    // 是否显示背景
    this.modelService.isShowBackImg$.subscribe((isShow:boolean) => {
      if(isShow == false){
        this.pic.src = ''
      }
      else{
        this.pic.src = this.path;
      }
      this.backCanvasUpadate();
    }); 
  }
  ngOnInit() {
  }

  // thisMouseDown(e:any) {
  //   let widx = 0
  //   let eve = e.clientX;
  //   let flag = true;
  //   e.target.onmousemove = (e:any) => {
  //     if(flag){
  //       let eve2 = e.clientX;
  //     widx = eve2 - eve;
  //     e.target.scrollLeft += widx;
      
  //     } 
  //   }
  //   e.target.onmouseup = (e:any) => {
  //     if(flag){
  //       flag = false;
  //     }
  //   }
  // }

// 电机改变背景图片时
  changeBack(e:any,path:any){
    this.pic.src= this.path = path;
    this.backCanvasUpadate();
  }
  // 导入背景图片
  addBackImg(e:any,data:any){
    let file = e.target.files[0];
    let name = file.name.split('.')[0];
    let reader = new FileReader();
    reader.onload =(file:any)=> {
      let s = file.target.result;
      this.renderImg.push({"name":name,"path":s});
      this.pic.src = this.path = s;
      this.backCanvasUpadate();
    }
    reader.readAsDataURL(file)
}

  imgStart() {
    this.backCanvas = document.getElementById('backCanvas');
    this.modelService.backCanvas = this.backCanvas;
    this.backCanvas.width = window.innerWidth;
    this.backCanvas.height = window.innerHeight
    this.context2D = this.backCanvas.getContext("2d");
    this.pic = new Image();
    this.pic.src = this.path = this.renderImg[0].path;
    this.pic.onload = (_:any)=> {
      if (this.pic.width * this.backCanvas.height == this.pic.height * this.backCanvas.width) {
        this.backCanvasMoveOption.swidth = this.pic.width;
        this.backCanvasMoveOption.sheight = this.pic.height;
        this.backCanvasMoveOption.width = this.backCanvas.width;
        this.backCanvasMoveOption.height = this.backCanvas.height;
      }
      else {
        var canvasRadio = this.backCanvas.width / this.backCanvas.height;
        var imgRadio = this.pic.width / this.pic.height;
        /**画布相对于图片更加宽*/
        if (canvasRadio > imgRadio) {
          /* 覆盖全屏*/
          /**图片重新裁剪适应画布 */
          this.backCanvasMoveOption.swidth = this.pic.width;
          this.backCanvasMoveOption.sheight = this.pic.width / canvasRadio;
          /**居中裁剪 */
          this.backCanvasMoveOption.sy = (this.pic.height - this.backCanvasMoveOption.sheight) / 2;
          /**画布尺寸不变 */
          this.backCanvasMoveOption.width = this.backCanvas.width;
          this.backCanvasMoveOption.height = this.backCanvas.height;
        }
        else {
          this.backCanvasMoveOption.sheight = this.pic.height;
          this.backCanvasMoveOption.swidth = this.pic.height * canvasRadio;
          /**居中裁剪 */
          this.backCanvasMoveOption.sx = (this.pic.width - this.backCanvasMoveOption.swidth) / 2;
          /**画布尺寸不变 */
          this.backCanvasMoveOption.width = this.backCanvas.width;
          this.backCanvasMoveOption.height = this.backCanvas.height;
        }
        this.backCanvasMoveOption.maxZoom = this.backCanvasMoveOption.swidth/this.backCanvas.width;
      }
      this.context2D = this.backCanvas.getContext("2d");
      this.context2D.save()
      this.context2D.drawImage(this.pic, this.backCanvasMoveOption.sx, this.backCanvasMoveOption.sy, this.backCanvasMoveOption.swidth, this.backCanvasMoveOption.sheight, this.backCanvasMoveOption.x, this.backCanvasMoveOption.y, this.backCanvasMoveOption.width, this.backCanvasMoveOption.height)
      this.context2D.restore();
      // console.log(this.backCanvas)
    }
  }

   /**================背景更新 =========================*/
   backCanvasUpadate() {
    this.context2D.clearRect(0, 0, this.backCanvas.width,this.backCanvas.height);
    this.context2D.save();
    this.context2D.drawImage(this.pic, this.backCanvasMoveOption.sx, this.backCanvasMoveOption.sy, this.backCanvasMoveOption.swidth,  this.backCanvasMoveOption.sheight , this.backCanvasMoveOption.x, this.backCanvasMoveOption.y,this.backCanvasMoveOption.width, this.backCanvasMoveOption.height)
    this.context2D.restore();
  }

  
}
