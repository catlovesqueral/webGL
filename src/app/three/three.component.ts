import { Component, OnInit  } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ModelService } from '../service/model.service';
import { Model } from '../class/Model.class'
declare var THREE:any;

@Component({
  selector: 'three-module',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {
    mainCanvas:any
    // 渲染器
    renderer:any;
    // 相机
    camera:any;
    // 设置场景
    scene:any = new THREE.Scene();
    group:any = new THREE.Group();
    map:any;
    mesh:any;
    orbit:any;
    renderList:any;
    id:any;
    isClick:boolean = true;
    load:any;
    modelLoad:any = new THREE.ColladaLoader();
    imgLoader:any = new THREE.TextureLoader();
    constructor(private modelService:ModelService){
        this.modelService.backData$.subscribe(data=>this.renderList=data.model);
        this.modelService.httpModel$.subscribe((data:any) => {
            for(let i = 0; i< this.renderList.length; i++) {
                if(this.renderList[i].id == data){
                    this.imgLoader.load(this.renderList[i].material,(img:any) => {
                        this.map = img;
                        this.addModel(this.renderList[i]); 
                    })     
                }
            }
            
        })
        this.modelService.moveModel$.subscribe((data:any) => {
            this.group.position.x += data.x/6
            this.group.position.y += data.y/6;   
        });
        // this.modelService.changeOrbitCenter$.subscribe((_:any) => {
        //     this.orbit.target.setX(20);
        //     this.orbit.position0.setX(-20);
        //     // this.orbit.position0.setY(this.group.position.y);
        // })
        this.modelService.backPosition$.subscribe((e)=>{
            this.group.position.x = 0;
            this.group.position.y = -20;
            this.orbit.reset();
        });
        this.modelService.changeModelColor$.subscribe((data:any) => {
            this.imgLoader.load(data.image,(img:any) => {
                this.mesh.children[1].material.map = img
                this.mesh.children[1].material.needsUpDate = true;
            });
        });
    }
    

    ngOnInit() {
        this.initScene();
        this.renderScene();
    }

    //初始化三维场景
    initScene(){
        this.mainCanvas = document.getElementById("mainCanvas");
        this.modelService.threeCanvas = this.mainCanvas;
        // let cube = new THREE.Mesh(new THREE.BoxGeometry(10,10,10));
        // this.scene.add(cube)
        //设置renderer。
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.mainCanvas,alpha:true,preserveDrawingBuffer:true });
        // console.log(this.renderer);
        this.renderer.setClearColor(0xa9a9a9,0);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //设置摄像机。
        this.camera = new THREE.PerspectiveCamera(45, this.mainCanvas.clientWidth / this.mainCanvas.clientHeight, 1, 1000);
        // 设置相机位置
        this.camera.position.set(0,0,80);
        // 将相机添加到场景中
        this.scene.add(this.camera);
        this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        //坐标轴辅助线
        let axisHelper = new THREE.AxesHelper( 500 );
        // this.scene.add( axisHelper );
        this.scene.add(this.group);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-300,350,-500);
        this.scene.add(directionalLight);
        // let spotLight = new THREE.AmbientLight( 0xaaaaaa,0.1);
        // this.scene.add(spotLight)
        //打上第二盏灯光。
        let directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight3.position.set(300,400,500);
        this.scene.add(directionalLight3);
      
        window.addEventListener( 'resize', (_:any) => {
             this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );
    }
   
    addModel(modelPath:any){
        if(this.group.children.length != 0){
            for(let k in this.group.children){
              this.group.children[k].children[1].geometry.dispose();
              this.group.children[k].children[1].material.dispose();
            }
            this.group.children.splice(0,this.group.children.length);
          }
        this.modelLoad.load(modelPath.path,(model:any) =>{
            for(let i = 0; i < model.scene.children.length;i++){
                this.mesh = model.scene;
                if(this.mesh.children[i].type == "Mesh"){
                    // this.map = this.mesh.children[i].material.map;
                    this.mesh = model.scene;
                    // console.log(this.mesh)
                    this.mesh.children[i].geometry.computeBoundingBox();
                    let size = {
                        "x":Math.floor((Math.abs(this.mesh.children[i].geometry.boundingBox.min.x)+Math.abs(this.mesh.children[i].geometry.boundingBox.max.x))/10),
                        "y":Math.floor((Math.abs(this.mesh.children[i].geometry.boundingBox.min.y) + Math.abs(this.mesh.children[i].geometry.boundingBox.max.y))/10),
                        "z":Math.floor((Math.abs(this.mesh.children[i].geometry.boundingBox.min.z) + Math.abs(this.mesh.children[i].geometry.boundingBox.max.z))/10)
                    }
                    modelPath.size = '尺寸：' + size.x +'*'+size.y+'*'+size.z;
                    if(!this.mesh.children[i].material.length){
                        this.mesh.children[i].material.dispose();
                        this.mesh.children[i].material = new THREE.MeshBasicMaterial({map:this.map});
                    }
                    else{   
                        this.imgLoader.load(modelPath.aoMap,(img:any) => {
                            for(let a = 0; a <this.mesh.children[i].material.length; a++){
                                this.mesh.children[i].material[a].lightMap  = img;
                                this.mesh.children[i].material[a].needsUpDate = true;
                            }  
                        })        
                        }
                     
                }
            }
            this.group.add(this.mesh);
            this.group.position.y = modelPath.position.y;
            this.group.position.z = modelPath.position.z;
            this.isClick = false;
            if(this.load == 100){
                this.modelService.isload$.emit(this.isClick); 
            }       
        },
        (xhr:any) => {
            if(xhr.total == 0){
                xhr.total = 1882546;
            }
            this.load = Math.floor(xhr.loaded/xhr.total * 100 );
            // alert(this.load)
            this.modelService.loading$.emit(this.load);
        })
    }

    //动画帧。
    renderScene() {
        //这里是动画帧，会一帧一帧调用。
        requestAnimationFrame(_ => this.renderScene());
        if(this.modelService.ifOrbitControl){
            this.orbit.enabled = true;
            this.orbit.update();
        }
        else{
            this.orbit.enabled = false;
        }
        
        // this.group.rotation.y += 0.005
        this.renderer.render(this.scene, this.camera);
    }
}
