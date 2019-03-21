
import  'three/examples/js/controls/PointerLockControls'

class PointLockControlsModule {
  constructor(scene,camera,playerBody,blockerID,instructionID){
    let pControls;
    let moveForward = false;//向前
    let moveBackward = false;//向后
    let moveLeft = false;//向左
    let moveRight = false;//向右
    let canJump = false;//跳跃
    let raycaster;//用于做碰撞检测
    let prevTime = Date.now(); // 初始时间
    let velocity = new THREE.Vector3(); // 移动速度向量
    let direction = new THREE.Vector3(); // 移动方向向量

    //鼠标锁定初始化
    pControls = new THREE.PointerLockControls(camera);
    pControls.getObject().position.set(0,1,0);
    scene.add(pControls.getObject());
    //进入画面
    let blocker = document.getElementById(blockerID);
    let instructions = document.getElementById(instructionID)
    let havenPointerLock =
      'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;
    if (havenPointerLock){
      instructions.addEventListener(
        'click',
        function () {
          pControls.lock();
        },
        false
      );
      pControls.addEventListener('lock',function () {
        instructions.style.display = 'none';//移除提示
        blocker.style.display = 'none';
      });
      pControls.addEventListener('unlock',function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
      })
    } else {
      instructions.innerHTML =
        '你的浏览器不支持Pointer Lock API，建议使用电脑版Google Chrome浏览器'
    }
    const onKeyDown = function (event) {
      switch (event.keyCode){
        case 38://up
        case 87://w
          moveForward = true;
          break;
        case 37:
        case 65:
          moveLeft = true;
          break;
        case 40:
        case 83:
          moveBackward = true;
          break;
        case 39:
        case 68:
          moveRight = true;
          break;
        case 32:
          if (canJump === true) velocity.y += 350;
          canJump = false;
          break;
        default:
          break;
      }
    };
    const onKeyUp = function (event) {
      switch (event.keyCode){
        case 38:
        case 87:
          moveForward = false;
          break;
        case 37:
        case 65:
          moveLeft = false;
          break;
        case 40:
        case 83:
          moveBackward = false;
          break;
        case 39:
        case 68:
          moveRight = false;
          break;
      }
    };
    document.addEventListener('keydown',onKeyDown,false);
    document.addEventListener('keyup',onKeyUp,false);

    //碰撞检测
    raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0,-1,0),
      0,10
    );

   this.pointerLockControlersRender = function () {
      if (pControls.isLocked === true){
        raycaster.ray.origin.copy(pControls.getObject().position)
        let intersections = raycaster.intersectObjects(scene.children,true);
        let onObject = intersections.length > 0;

        //计算时差
        let time = Date.now();
        let delta = (time - prevTime) / 1000;

        //设定初始速度变化
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; //自由落体速度

        //判断按键朝什么方向移动，并设定对应方向速度变化（把booler值变成0或者1）
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveLeft) - Number(moveRight);

        if (moveForward || moveBackward){
          velocity.z -= direction.z * 400.0 * delta
        }
        if (moveLeft || moveRight ){
          velocity.x -= direction.x * 400.0 * delta;
        }

        //跳跃处理
        if (onObject === true){
          velocity.y = Math.max(0,velocity.y);
          canJump = true;
        }
        //根据速度值移动控制器的位置
        pControls.getObject().translateX(velocity.x * delta);
        pControls.getObject().translateY(velocity.y * delta);
        pControls.getObject().translateZ(velocity.z * delta);
        if (pControls.getObject().position.y < -2000){
          velocity.y = 0;
          pControls.getObject().position.set(0,1,0);
          canJump = true;
        }
        prevTime = time;

      }
    }


  }
}

export default PointLockControlsModule;
