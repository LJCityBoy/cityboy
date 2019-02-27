import 'three/examples/js/controls/OrbitControls'
import Stats from 'three/examples/js/libs/stats.min'
import dat from 'three/examples/js/libs/dat.gui.min'

function main(){

let renderer,camera,scene,controller,cameraController,stats,gui;
let creeperObj;
let ambientLight,pointLight,spotLight,directionalLight, sphereLightMesh;
let rotateAngle = 0;
let invert = 1;

//Creeper类
class Creeper {
  constructor(){
    //确定头、身体、脚的大小
    const headGeo = new THREE.BoxGeometry(4,4,4);
    const bodyGeo = new THREE.BoxGeometry(4,8,2);
    const footGeo = new THREE.BoxGeometry(2,3,2);

    //加载脸部贴图
    const headMap = new THREE.TextureLoader().load(
      '../../../../static/creeper/creeper_face.png'
    );

    //加载皮肤贴图
    const skinMap = new THREE.TextureLoader().load(
      'https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png'
    );

    //创建统一的材质
    // const creeperMat = new THREE.MeshPhongMaterial({color:0x00ff00});

    //脚及身体的贴图材质
    const skinMat = new THREE.MeshPhongMaterial({
      roughness:0.8,//粗糙度
      metalness: 0.8, //金属感
      transparent: false, //是否透明
      opacity:0.9, //透明度
      side:THREE.DoubleSide, //双面贴图
      map: skinMap //贴上皮肤贴图
    });

    //头部与脸部的材质贴图
    const headMaterials = [];
    for (let i = 0; i < 6; i++) {
      let map;
      if (i ===4 ) map = headMap;
      else map = skinMap;

      headMaterials.push(new THREE.MeshPhongMaterial({
        map:map
      }));
    }


    //头
    this.head = new THREE.Mesh(headGeo,headMaterials);
    this.head.position.set(0,6,0);
    this.head.rotation.y = 0.5;

    //身体
    this.body = new THREE.Mesh(bodyGeo,skinMat);
    this.body.position.set(0,0,0);

    //创建4条肢体
    this.foot1 = new THREE.Mesh(footGeo,skinMat);
    this.foot1.position.set(-1,-5.5,2);
    this.foot2 = this.foot1.clone();//克隆第一条foot
    this.foot2.position.set(-1,-5.5,-2);
    this.foot3 = this.foot1.clone();
    this.foot3.position.set(1,-5.5,2);
    this.foot4 = this.foot1.clone();
    this.foot4.position.set(1,-5.5,-2);

    //把4条腿合为一个Group
    this.feet = new THREE.Group();
    this.feet.add(this.foot1);
    this.feet.add(this.foot2);
    this.feet.add(this.foot3);
    this.feet.add(this.foot4);

    ///把头和身体组合成一个Group
    this.creeper = new THREE.Group();
    this.creeper.add(this.head);
    this.creeper.add(this.body);
    this.creeper.add(this.feet);

    //creeper投影设定
    this.creeper.traverse(function (object) {
      if (object instanceof THREE.Mesh){
        object.castShadow = true;
        object.receiveShadow = true;
      }
    })

  }
}

//创建Creeper,加到场景中
function createCreeper() {
  creeperObj = new Creeper();
  scene.add(creeperObj.creeper);
}

//gui控件设置
let datGUIControls = new function () {
  this.AmbientLight = true;
  this.PointLight = false;
  this.SpotLight = false;
  this.DirectionalLight = false;
};


//初始化
function init() {
  controller = document.getElementById('myWorld');
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55,window.innerWidth/(window.innerHeight-120),0.1,1000);
  camera.position.set(30,30,30);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight-120);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = 2;

  //创建简单的地板
  let planeGeometry = new THREE.PlaneGeometry(60,60);
  let planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  let planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
  planeMesh.position.set(0,-7,0);
  planeMesh.rotation.x = -0.5 * Math.PI;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  //创建Creeper
  createCreeper();


  //添加灯光
  ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);//环境光

  //基本的点光源 变成移动光源
  pointLight = new THREE.PointLight(0xeeff00,1,100);
  pointLight.castShadow = true;
  // pointLight.position.set(-10,20,20);
  scene.add(pointLight);
  // let pointLightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(pointLightHelper);
  // pointLight.visible = false;
  // pointLightHelper.visible = false;


  //小球体光源
  let sphereLightGeo = new THREE.SphereGeometry(0.3);
  let shereLightMat = new THREE.MeshBasicMaterial({color:0xccffcc});
  sphereLightMesh = new THREE.Mesh(sphereLightGeo,shereLightMat);
  sphereLightMesh.castShadow = true;
  sphereLightMesh.position.y = 16;
  scene.add(sphereLightMesh);

  spotLight = new THREE.SpotLight(0xeeff00);
  spotLight.position.set(-10,30,20);
  // spotLight.castShadow = true;
  scene.add(spotLight);//点光源
  // let spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);
  // spotLight.visible = false;
  // spotLightHelper.visible =  false;

  /* directional光源
  directionalLight = new THREE.DirectionalLight(0xeeff00);
  directionalLight.position.set(-10,20,20);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  let directionLightHelper = new THREE.DirectionalLightHelper(directionalLight);
  scene.add(directionLightHelper);
  directionalLight.visible = false;
  directionLightHelper.visible = false;
  */

  //gui控件
  /*
  gui = new dat.GUI();
  gui.domElement.style.marginTop = '80px';
  gui.add(datGUIControls,'AmbientLight').onChange(function (e) {
    ambientLight.visible = e;
  });
  gui.add(datGUIControls,'PointLight').onChange(function (e) {
    pointLight.visible = e;
    pointLightHelper.visible = e;
  });
  gui.add(datGUIControls,'SpotLight').onChange(function (e) {
    spotLight.visible = e;
    spotLightHelper.visible = e;
  });
  gui.add(datGUIControls,'DirectionalLight').onChange(function (e) {
    directionalLight.visible = e;
    directionLightHelper.visible = e;
  });
  */



  //轨道控制器
  cameraController = new THREE.OrbitControls(camera);
  cameraController.enableDamping = true;
  cameraController.dampingFactor = 0.25;
  cameraController.autoRotate = false;//是否自动旋转
  cameraController.autoRotateSpeed = 0.5;//旋转速度

  //帧率检查
  stats = new Stats();
  let a = stats.dom;
  a.style.top = '80px';
  controller.appendChild(stats.dom);

  controller.appendChild(renderer.domElement);
  window.addEventListener('resize',onWindowResize,false);

}

//点光源绕Y轴转
function pointLightAnimation() {
  if (rotateAngle > 2 * Math.PI){
    rotateAngle = 0;
  }else {
    rotateAngle += 0.03;
  }

  //光源绕椭圆轨道转
  sphereLightMesh.position.x = 8 * Math.cos(rotateAngle);
  sphereLightMesh.position.z = 4 * Math.sin(rotateAngle);

  //让点光源与球同步
  pointLight.position.copy(sphereLightMesh.position);

}



function onWindowResize() {
  camera.aspect = window.innerWidth / (window.innerHeight-120);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight-120);
}

function render(){
  requestAnimationFrame(render);
  cameraController.update();
  pointLightAnimation();
  stats.update();
  renderer.render(scene,camera);
}


  init();
  render();
}

export default {
  action:main //加载完毕html再加载场景
}
