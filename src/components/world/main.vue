<template>
  <div id="myWorld">
    <div id="blocker">
      <div id="instructions">
        <span style="font-size:40px">点击开始</span>
        <br />
        (W, A, S, D = 控制方向, SPACE = 跳跃, MOUSE = 转动视觉)
      </div>
    </div>
  </div>
</template>

<script>


  import myWorld from '../../assets/js/creation/world'
  // import partical from '../../assets/js/creation/particleTest'
  // import explosion from '../../assets/js/creation/explosion'

  export default {
    mounted: [myWorld.action/*,partical.action,explosion.action*/]
  }
</script>

<style scoped >
  #blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #instructions {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    box-pack: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;
    color: #ffffff;
    text-align: center;
    cursor: pointer;

  }

</style>
