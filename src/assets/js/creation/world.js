import 'three/examples/js/controls/OrbitControls'
import Stats from 'three/examples/js/libs/stats.min'
import Creeper from './creeperModule'; //引入creeper类
import  'three/examples/js/controls/PointerLockControls'
import CreeperAnimation from './creeperAnimationModule'
import PointsSceneModule from './pointsSceneModule'
import PointerLockControl from './pointerLockControlsModule'
import Explosion from "./explosionModule";

function main(){

  let renderer,camera,scene,controller,cameraController,stats;
  let creeperObj;
  let ambientLight,pointLight,spotLight,directionalLight, sphereLightMesh;
  let rotateAngle = 0;
  let creeperAnimation = new CreeperAnimation();//creeper动画对象
  let snow;//雪花效果对象
  let pointLockCon;//键盘控制器对象
  let explosion;//爆炸类对象


  //创建Creeper,加到场景中
  function createCreeper() {
    creeperObj = new Creeper();
    //补间动画
    creeperAnimation.tweenHandler(creeperObj,camera);
    scene.add(creeperObj.creeper);
  }


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
    let planeGeometry = new THREE.PlaneGeometry(300,300);
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
    pointLight = new THREE.PointLight(0xf0f0f0,1,100);
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



    //轨道控制器
    /*
    cameraController = new THREE.OrbitControls(camera);
    cameraController.enableDamping = true;
    cameraController.dampingFactor = 0.25;
    cameraController.autoRotate = false;//是否自动旋转
    cameraController.autoRotateSpeed = 0.5;//旋转速度

  */
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

  //粒子系统 雪景
  function snowAnimation() {
     snow = new PointsSceneModule(scene);
     snow.createPoints();
  }

  //烟花效果
  function explosionAnimation() {
    //创建爆炸对象
    let time = window.setInterval(()=>{
      if (explosion){
        explosion.destroy()
      }
      explosion = new Explosion(
        scene,
        THREE.Math.randFloat(-100,100),
        THREE.Math.randFloat(40,90)
      );
    },2000);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / (window.innerHeight-120);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight-120);
  }

  //渲染
  function render(){
    requestAnimationFrame(render);
    // cameraController.update();
    //灯光动画
    pointLightAnimation();
    //摇头动画
    creeperAnimation.creeperHeadOffsetRotate(creeperObj);
    //走路脚步动画
    creeperAnimation.creeperWalkOffset(creeperObj);
    //缩放动画
    creeperAnimation.creeperScaleBody(creeperObj);
    //下雪动画
    snow.snowAnimation();
    creeperAnimation.update();
   //键盘控制
    pointLockCon.pointerLockControlersRender();
    //爆炸烟花更新
    if (explosion)  explosion.update();
    stats.update();
    renderer.render(scene,camera);
  }


  init();
  //创建雪景
  snowAnimation();
  //初始化键盘控制器
  pointLockCon = new PointerLockControl(scene,camera,"blocker","instructions");
  explosionAnimation();
  render();
}


export default {
  action:main //加载完毕html再加载场景
}
