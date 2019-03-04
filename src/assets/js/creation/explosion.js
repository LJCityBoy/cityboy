//爆炸
import 'three/examples/js/controls/OrbitControls'
import Explosion from './explosionModule'

function main() {
  let camera,renderer,scene,cameraControl,controller;
  //爆炸类对象
  let explosion;

  function init() {
    controller = document.getElementById('myWorld');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55,window.innerWidth/(window.innerHeight-120),0.1,1000);
    camera.position.set(0,0,400);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);

    let ambientLight = new THREE.AmbientLight({color:0xffffff});
    // scene.add(ambientLight);

    cameraControl = new THREE.OrbitControls(camera);
    controller.appendChild(renderer.domElement);

    //创建爆炸对象
    let time = window.setInterval(()=>{
      if (explosion){
        explosion.destroy()
      }
      explosion = new Explosion(
        scene,
        THREE.Math.randFloat(-100,100),
        THREE.Math.randFloat(-100,100)
      );
    },2000);

  }

  function render() {
    renderer.render(scene,camera);
    if (explosion)  explosion.update();


  }
  function loop() {
    requestAnimationFrame(loop);
    render();
  }


  init();
  loop();
}

export default {
  action:main
}
