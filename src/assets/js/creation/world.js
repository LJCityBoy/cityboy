import 'three/examples/js/controls/OrbitControls'
import Stats from 'three/examples/js/libs/stats.min'
import Creeper from './creeperModule'; //引入creeper类
import  'three/examples/js/controls/PointerLockControls'
import CreeperAnimation from './creeperAnimationModule'
import PointsSceneModule from './pointsSceneModule'
import PointerLockControl from './pointerLockControlsModule'
import Explosion from "./explosionModule";
import CANNON from 'cannon'

function main(){

  let renderer,camera,scene,controller,cameraController,stats;
  let creeperObj;
  let ambientLight,pointLight,spotLight,directionalLight, sphereLightMesh;
  let rotateAngle = 0;
  let creeperAnimation = new CreeperAnimation();//creeper动画对象
  let snow;//雪花效果对象
  let pointLockCon;//键盘控制器对象
  let explosion;//爆炸类对象
  let world,physicsMaterial,groundBody;
  let sphereShape, sphereBody;
  let boxes = [];
  let boxMeshes = [];


  function initController() {
    controller = document.getElementById('myWorld');

  }
  //引入刚体解算
  function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,-20,0);//重力y轴向负方向
    world.broadphase = new CANNON.NaiveBroadphase();//????
    //解算器设定
    const  solver = new CANNON.GSSolver();
    solver.iterations = 7;//解算迭代次数，越高越精确
    solver.tolerance = 0.1;//解算容许的误差值
    const split = true;
    if (split) world.solver = new CANNON.SplitSolver(solver);
    else world.solver = solver;

    //接触材质相关设定（摩擦力，恢复系数）
    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRelaxation = 4;
    physicsMaterial = new CANNON.Material('slipperyMaterial');
    const physicsContactMaterial = new CANNON.ContactMaterial(
      physicsMaterial,
      physicsMaterial,
      0.0,//摩擦系数
      0.3 //恢复系数
    );
    world.addContactMaterial(physicsContactMaterial);

    sphereShape = new CANNON.Sphere(1.5);
    sphereBody = new CANNON.Body({mass:5});
    sphereBody.addShape(sphereShape);
    sphereBody.position.set(0,7,0);
    sphereBody.linearDamping = 0.9;
    world.addBody(sphereBody);
  }

  //状态监视器
  function initStats() {
//帧率检查
    stats = new Stats();
    let a = stats.dom;
    a.style.top = '80px';
    controller.appendChild(stats.dom);
  }

  function initScene() {
    scene = new THREE.Scene();
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/(window.innerHeight-120),0.1,1000);
    // camera.position.set(30,30,30);
    // camera.lookAt(scene.position);
  }

  function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight-120);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = 2;
    controller.appendChild(renderer.domElement);
  }

  function initLight() {
//添加灯光
    ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);//环境光

    //基本的点光源 变成移动光源
    pointLight = new THREE.PointLight(0xf0f0f0,1,100);
    pointLight.castShadow = true;
    // pointLight.position.set(-10,20,20);
    // scene.add(pointLight);
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
    spotLight.position.set(-100,100,100);
    spotLight.castShadow = true;
    scene.add(spotLight);//点光源
    // let spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);
    // spotLight.visible = false;
    // spotLightHelper.visible =  false;

     //directional光源
    /*
    directionalLight = new THREE.DirectionalLight(0xeeff00);
    directionalLight.position.set(-10,20,20);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    let directionLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(directionLightHelper);
    directionalLight.visible = false;
    directionLightHelper.visible = false;
    */

  }

  function createGround() {

    //创建刚体地板
    let groundShape = new CANNON.Plane();
    let groundCM = new CANNON.Material();
    groundBody = new CANNON.Body({
      mass:0,
      shape:groundShape,
      material:groundCM
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);//旋转90度
    world.add(groundBody);


    //创建简单的地板
    let planeGeometry = new THREE.PlaneGeometry(300,300,50,50);
    let planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
    let planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
    // planeMesh.position.set(0,-7,0);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.receiveShadow = true;
    planeMesh.name = 'floor';
    scene.add(planeMesh);
  }

  //创建Creeper,加到场景中
  function createCreeper() {
    creeperObj = new Creeper();
    creeperObj.creeper.position.set(0,7,0);
    //补间动画
    creeperAnimation.tweenHandler(creeperObj,camera);
    scene.add(creeperObj.creeper);
  }

  function createBoxes(count) {
    // Add boxes
    const halfExtents = new CANNON.Vec3(1, 1, 1)
    const boxShape = new CANNON.Box(halfExtents)
    const boxGeometry = new THREE.BoxGeometry(
      halfExtents.x * 2,
      halfExtents.y * 2,
      halfExtents.z * 2
    );

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = 0 + (Math.random() - 0.5) * 1
      const z = (Math.random() - 0.5) * 30
      const boxBody = new CANNON.Body({ mass: 5 })
      boxBody.addShape(boxShape)
      const boxMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
      });
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
      world.addBody(boxBody)
      scene.add(boxMesh)
      boxBody.position.set(x, y, z)
      boxMesh.position.set(x, y, z)
      boxMesh.castShadow = true
      boxMesh.receiveShadow = true
      boxes.push(boxBody)
      boxMeshes.push(boxMesh)
    }
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

  //初始化
  function init() {


    initController();
    initCannon();
    initScene();
    initCamera();
    initRenderer();
    initLight();
    initStats();
    createGround();
    //创建Creeper
    createCreeper();
    createBoxes(30);
    //创建雪景
    snowAnimation();
  //初始化键盘控制器
    pointLockCon = new PointerLockControl(scene,camera,sphereBody,"blocker","instructions");

    explosionAnimation();

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
    world.step(0.016)
    // Update box mesh positions
    for (let i = 0; i < boxes.length; i++) {
      boxMeshes[i].position.copy(boxes[i].position)
      boxMeshes[i].quaternion.copy(boxes[i].quaternion)
    }
    //爆炸烟花更新
    if (explosion)  explosion.update();
    stats.update();
    renderer.render(scene,camera);
  }


  window.addEventListener('resize',onWindowResize,false);
  init();
  render();
}


export default {
  action:main //加载完毕html再加载场景
}
