export class Loading {
    ctx:any;
    width;any;
    height:any;
    // img:any;
    cvsElement:any;
    rad:any = Math.PI*2/100; //将360度分成100份，那么每一份就是rad度
    speed:number = 0.1;
    constructor(private para:canvasParam){
        // s
        this.init()
    }
    init(){
        this.cvsElement = document.getElementById(this.para.element);//获取元素
        this.ctx=this.cvsElement.getContext("2d");//获取画笔
        this.width = this.cvsElement.width;//元素宽度
        this.height=this.cvsElement.height;//元素高度
        // degActive=0,//动态线条
        // timer=null;//定时器
        // this.img = this.para.img;//背景图
        if (window.devicePixelRatio) {
            this.cvsElement.style.width = this.width + "px";
            this.cvsElement.style.height = this.height + "px";
            this.cvsElement.height = this.height * window.devicePixelRatio;
            this.cvsElement.width = this.width * window.devicePixelRatio;
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
    }

    drawCanvas(){
        
        this.ctx.clearRect(0,0,this.width,this.height);//清除画布
        this.ctx.beginPath();//开始绘制底圆
        this.ctx.arc(this.width/2,this.height/2,this.para.circleRadius,1,8);
        this.ctx.strokeStyle=this.para.lineBgColor;
        this.ctx.lineWidth = this.para.lineWidth;
        this.ctx.stroke();
        this.ctx.beginPath();//开始绘制动态圆
        this.ctx.arc(this.width/2,this.height/2,this.para.circleRadius,-Math.PI/2,-Math.PI/2 +this.para.degActive*this.rad,);
        this.ctx.strokeStyle=this.para.lineColor;
        this.ctx.lineWidth = this.para.lineWidth;
        this.ctx.stroke();
        let txt=(this.para.degActive +"%");//获取百分比
        this.ctx.font=this.para.fontSize+"px SimHei";
        let w=this.ctx.measureText(txt).width;//获取文本宽度
        let h=this.para.fontSize/2;
        this.ctx.fillStyle=this.para.textColor;
        this.ctx.fillText(txt,this.width/2-w/2,this.height/2+h/2);
    }

}
interface canvasParam {
    // 画布元素
    element:any;
    // 绘制角度
    degActive:number;
    lineWidth:number;//线宽
    lineBgColor:any;//底圆颜色
    lineColor:any;//动态圆颜色
    textColor:any;//文本颜色
    fontSize:number;//字体大小
    circleRadius:number;//圆半径,

}