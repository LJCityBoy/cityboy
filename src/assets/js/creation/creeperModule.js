
class Creeper {
  constructor () {
    //确定头、身体、脚的大小
    const headGeo = new THREE.BoxGeometry(4,4,4);
    const bodyGeo = new THREE.BoxGeometry(4,8,2);
    const footGeo = new THREE.BoxGeometry(2,3,2);

    //加载脸部贴图
    const headMap = new THREE.TextureLoader().load(
      './static/creeper/creeper_face.png'
    );

    //加载皮肤贴图
    const skinMap = new THREE.TextureLoader().load(
      './static/creeper/creeper_skin.png'
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

export default Creeper;
