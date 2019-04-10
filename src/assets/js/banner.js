// import { resolve } from "path";


function banner(srcjson) {
  // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  var container;

  var HEIGHT = 260;
  var camera, scene, renderer;

  var mesh, lightMesh, geometry;
  var spheres = [];

  var directionalLight, pointLight;

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = HEIGHT / 2;

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  init();
  animate();

  function init() {

    container = document.getElementById('cb-container');

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / HEIGHT, 1, 100000 );
    camera.position.z = 3200;

    scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
      .setPath("./static/Park3Med/" )
      .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    

    var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background, refractionRatio: 0.95 } );
    material.envMap.mapping = THREE.CubeRefractionMapping;

    for ( var i = 0; i < 500; i ++ ) {

      var mesh = new THREE.Mesh( geometry, material );

      mesh.position.x = Math.random() * 10000 - 5000;
      mesh.position.y = Math.random() * 10000 - 5000;
      mesh.position.z = Math.random() * 10000 - 5000;

      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

      scene.add( mesh );

      spheres.push( mesh );

    }

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, HEIGHT );
    container.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = HEIGHT / 2;

    camera.aspect = window.innerWidth / HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, HEIGHT );

  }

  function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;

  }

//

  function animate() {

    requestAnimationFrame( animate );

    render();

  }

  function render() {

    var timer = 0.0001 * Date.now();

    for ( var i = 0, il = spheres.length; i < il; i ++ ) {

      var sphere = spheres[ i ];

      sphere.position.x = 5000 * Math.cos( timer + i );
      sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

    }

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );

  }

}

export default {
  action:banner
}
