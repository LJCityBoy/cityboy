
//下雪效果
class PointsSceneModule {
  constructor(scene){
    let snowPoints;
    //生产雪花
    this.createPoints = function () {

      let pointLength = 5200;//粒子数量

      //加载粒子贴图
      let texture = new THREE.TextureLoader().load('./static/creeper/snowflake.png');

      let geometry = new THREE.Geometry();
      let material = new THREE.PointsMaterial({
        size:4,
        map:texture,
        // depthWrite:false,
        blending: THREE.AdditiveBlending,
        opacity:0.7
      });
      let rang = 300;
      for (let i = 0; i < pointLength; i++) {
        let pX =  THREE.Math.randInt(-rang/2,rang/2);//产生在区间的随机数
        let pY =  THREE.Math.randInt(0,rang * 20);
        let pZ =  THREE.Math.randInt(-rang/2,rang/2);
        let point = new THREE.Vector3(pX,pY,pZ);
        point.velocityX = THREE.Math.randFloat(-0.16,0.16);
        point.velocityY = THREE.Math.randFloat(0.1,0.3);
        geometry.vertices.push(point);
      }

      snowPoints = new THREE.Points(geometry,material);
      scene.add(snowPoints);
    };


    //飘雪动画
   this.snowAnimation = function () {
      snowPoints.geometry.vertices.forEach(v =>{
        if (v.y >= -7){
          v.x = v.x - v.velocityX;
          v.y = v.y - v.velocityY;
        }
        if (v.x<= -150 || v.x>=150) v.x = v.x * -1;

      });

      snowPoints.geometry.verticesNeedUpdate = true;//必须设置为true才会动画
    }

  }
}

export default PointsSceneModule;
