//爆炸效果/或者叫做烟花效果
class Explosion {
  constructor(scene,x,y){
    //材质
    this.smokeTexture = new THREE.TextureLoader().load('./static/creeper/smoke.png');
    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
      size:15,
      map:this.smokeTexture,
      color:new THREE.Color(Math.random()*0xffffff),
      blending:THREE.AdditiveBlending,
      depthWrite:false
    });

    this.pCount = 11000;//爆炸粒子数量
    this.moveSpeed = 50;//爆炸粒子飞行速度
    this.dirs = [];
    this.scene = scene;

    //创建爆炸的点
    for (let i = 0; i < this.pCount; i++) {
      let vector = new THREE.Vector3(x,y,0);
      geometry.vertices.push(vector);
      //喷射速度
      let speed = this.moveSpeed * THREE.Math.randFloat(0,1) + 2;
      //喷射方向
      let theta = Math.random() * Math.PI *2;
      let tpi = Math.random() * Math.PI;
      this.dirs.push({
        x:speed * Math.sin(tpi) * Math.sin(theta),
        y:speed * Math.sin(tpi) * Math.cos(theta),
        z:speed * Math.cos(tpi)
      })
    }

    let points = new THREE.Points(geometry,material);
    this.object = points;
    this.scene.add(this.object);
  }
  //不断更新粒子位置
  update(){
    let p = this.pCount;
    const d = this.dirs;
    while (p--){
      let dp = this.object.geometry.vertices[p];
      dp.x += d[p].x;
      dp.y += d[p].y;
      dp.z += d[p].z;
    }
    //更新
    this.object.geometry.verticesNeedUpdate = true;
  }

  //消除离开视野的粒子
  destroy(){
    this.object.geometry.dispose();
    this.scene.remove(this.object);
    this.dirs.length = 0;
  }

}
export default Explosion;
