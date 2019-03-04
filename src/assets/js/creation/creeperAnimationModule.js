//creeper动画
import TWEEN from "@tweenjs/tween.js/src/Tween";

class CreeperAnimationModules {
  constructor(){
    this.tweenHandler =   function (obj,camare) {
      let tween,tweenBack;
      let offset = {x: 0, z: 0, rotateY: 0};//初始值
      let target = {x: 20, z: 20, rotateY: 0.7563894};//目标值

      //creeper移动
      const onUpdate = () => {
        //移动
        obj.head.position.x = offset.x;
        obj.head.position.z = offset.z;
        obj.body.position.x = offset.x;
        obj.body.position.z = offset.z;
        obj.feet.position.x = offset.x;
        obj.feet.position.z = offset.z;

        //旋转
        if (target.x > 0) {
          //前进
          obj.head.rotation.y = offset.rotateY;
          obj.body.rotation.y = offset.rotateY;
          obj.feet.rotation.y = offset.rotateY;
        } else {
          obj.head.rotation.y = -offset.rotateY;
          obj.body.rotation.y = -offset.rotateY;
          obj.feet.rotation.y = -offset.rotateY;
        }
      };

      //计算新的目标值
      function handelNewTarget() {
        //限制creeper走动范围
        if (camare.position.x > 30) target.x = 20;
        else if (camare.position.x < -30) target.x = -20;
        else target.x = camare.position.x;

        if (camare.position.z > 30) target.z = 20;
        else if (camare.position.z < -30) target.z = -20;
        else target.z = camare.position.z;

        //得出原点方向和目标方向
        let v1 = new THREE.Vector2(0, 0);
        let v2 = new THREE.Vector3(target.x, target.z);

        // 根据公式求两向量夹角cos值
        let cosValue = v1.dot(v2) / (v1.length() * v2.length());

        //限制cosvalve在[-1,1]的范围
        if (cosValue>1) cosValue = 1;
        else if (cosValue < -1) cosValue = -1;

        //得到目标y值（转身角度）
        target.y = Math.acos(cosValue);

      }

      tween = new TWEEN.Tween(offset)
        .to(target,4000)
        .easing( TWEEN.Easing.Quadratic.Out)
        .onUpdate(onUpdate)
        .onComplete(()=>{
          tweenBack.start()
        })
        .start();//启动动画
      tweenBack = new TWEEN.Tween(offset)
        .to({x:0,y:0,rotateY:0},4000)
        .easing( TWEEN.Easing.Quadratic.Out)
        .onUpdate(onUpdate)
        .onComplete(()=>{
          handelNewTarget();
          tween.start()
        })
    };
    this.update = function () {
      TWEEN.update();
    };
    //creeper摇头
    let rotaterHeadOffset = 0;
    this.creeperHeadOffsetRotate = function(obj) {
      rotaterHeadOffset += 0.04;
      obj.head.rotation.y = Math.sin(rotaterHeadOffset);
    };

//creeper身体膨胀
    let scaleOffset = 0;
    this.creeperScaleBody = function (obj) {
      scaleOffset += 0.04;
      let scaleRate = Math.abs(Math.sin(scaleOffset))/16 + 1;
      obj.creeper.scale.set(scaleRate,scaleRate,scaleRate);
    };

//creeper四肢运动
    let walkOffset = 0;
    this.creeperWalkOffset = function (obj) {
      walkOffset += 0.04;
      obj.foot1.rotation.x = Math.sin(walkOffset)/4;
      obj.foot2.rotation.x = -Math.sin(walkOffset)/4;
      obj.foot3.rotation.x = -Math.sin(walkOffset)/4;
      obj.foot4.rotation.x = Math.sin(walkOffset)/4;
    };

  }
}

export default CreeperAnimationModules;
