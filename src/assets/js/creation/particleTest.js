import 'three/examples/js/controls/OrbitControls'

function main() {
  let camera,renderer,scene,cameraControl,controller;
  let snowPoints;

  function init() {
    controller = document.getElementById('myWorld');
    scene = new THREE.Scene();
    //雾化场景
    scene.fog = new THREE.FogExp2(0x000000,0.008);

    camera = new THREE.PerspectiveCamera(55,window.innerWidth/(window.innerHeight-120),0.1,1000);
    camera.position.set(0,0,100);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);

    let ambientLight = new THREE.AmbientLight({color:0xffffff});
    // scene.add(ambientLight);

    cameraControl = new THREE.OrbitControls(camera);
    controller.appendChild(renderer.domElement);

  }

  //自定义创建粒子
  function createCustomPoint() {
    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
      size:4,
      color:0xff00ff
    });

    //创建三维点
    for (let x = -5; x < 5; x++) {
      for (let y = -5; y < 5; y++) {
        let point = new THREE.Vector3(x * 10,y * 10,0);
        geometry.vertices.push(point);
      }
    }

    //
    let points = new THREE.Points(geometry,material);
    points.position.set(10,10,15);
    scene.add(points);
  }
  //创建盒子点（其实就是把盒子变成点）
  function createBoxPoint() {
    let geometry = new THREE.BoxGeometry(40,20,25,8,8,8);
    let material = new THREE.PointsMaterial({
      size:3,
      color:0x0fff00
    });
    let boxPoint = new THREE.Points(geometry,material);
    boxPoint.position.set(10,10,-50);
    scene.add(boxPoint);
  }

  //粒子系统
  function createPoints() {

    let pointLength = 5200;//粒子数量

    //加载粒子贴图
    let texture = new THREE.TextureLoader().load('./static/creeper/snowflake.png');

    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
      size:3,
      map:texture,
      depthWrite:false,
      blending: THREE.AdditiveBlending
    });
    for (let i = 0; i < pointLength; i++) {
      let pX =  THREE.Math.randInt(-250,250);//产生在[-250,250]区间的随机数
      let pY =  THREE.Math.randInt(-250,250);
      let pZ =  THREE.Math.randInt(-250,250);
      let point = new THREE.Vector3(pX,pY,pZ);
      point.velocityX = THREE.Math.randFloat(-0.16,0.16);
      point.velocityY = THREE.Math.randFloat(0.1,0.3);
      geometry.vertices.push(point);
    }

    snowPoints = new THREE.Points(geometry,material);
    snowPoints.position.set(20,10,10);
    scene.add(snowPoints);
  }

  function snowAnimation() {
    snowPoints.geometry.vertices.forEach(v =>{
        v.x = v.x - v.velocityX;
        v.y = v.y - v.velocityY;

        if (v.x<= -250 || v.x>=250) v.x = v.x * -1;
        if (v.y<=-250) v.y = 250;
    });

    snowPoints.geometry.verticesNeedUpdate = true;//必须设置为true才会动画
  }


  function render() {
    renderer.render(scene,camera);
    snowAnimation();
  }
  function loop() {
    requestAnimationFrame(loop);
    render();
  }


  init();
  // createCustomPoint();
  // createBoxPoint();
  createPoints();
  loop();
}

export default {
  action:main
}
