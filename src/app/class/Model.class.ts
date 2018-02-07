declare var THREE: any;
export class Model {
    modelLoad:any = new THREE.ColladaLoader();
    option:any;
    funScale:any;
    constructor(option:any){
        this.option = option;
    }

    addModel(modelPath:any,callback:any){
        this.modelLoad.load(modelPath,(model:any) =>{
            // console.log(model)
            for(let i = 0; i < model.scene.children.length;i++){
                if(model.scene.children[i].type == "Mesh"){
                    let map = model.scene.children[i].material.map;
                    model.scene.children[i].material.dispose();
                    model.scene.children[i].material = new THREE.MeshBasicMaterial({map:map});
                }
            }
            return model.scene;
        })
    }

    //模型做水平面方向上移动的按钮===============================
  moveAroundXPos: number = 0;
  moveAroundZPos: number = 0;
  OnMoveStart(e) {
    if(e.clientY){
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
    }
    else{
      this.moveAroundXPos = e.touches[0].clientX;
      this.moveAroundZPos = e.touches[0].clientY;
    }
  }
  OnMoveMove(e) {
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
  }
}