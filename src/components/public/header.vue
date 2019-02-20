<template>
  <header>
    <div class="cb-logo"><a href="#"></a></div>
    <nav class="cb-topnav" id="cb-topnav">
      <router-link :to="{name:'home'}">
        <span>首页</span><span class="en">Home</span>
      </router-link>
      <router-link :to="{name:'about'}">
        <span>关于我</span><span class="en">About</span>
      </router-link>
      <router-link :to="{name:'chores'}">
        <span>杂事分类</span><span class="en">Class</span>
      </router-link>
      <router-link :to="{name:'world'}">
        <span>我的小天地</span><span class="en">World</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
    export default {
      mounted:widget
    }

    function widget() {
      var obj = null;
      var As = document.getElementById('cb-topnav').getElementsByTagName('a');
      obj = As[0];
      for(var i = 1; i < As.length; i++){
        if(window.location.href.indexOf(As[i].href) >= 0 ){
          obj = As[i];
        }
      }
      obj.id='cb-topnav-current';
    }
</script>

<style  scoped>

  header{
    width: 1000px;
    margin: auto;
    height: 80px;
    position: relative;
    overflow: hidden;
  }
  .cb-logo a{
    width: 260px;
    height: 60px;
    background: url(../../assets/images/logo2.png) no-repeat;
    position: absolute;
    display: block;
    margin: 10px 0px;
  }
  nav{
    float: right;
    margin: 30px 0 0 0;
  }

  nav a{
    position: relative;
    display: inline-block;
    font-size: 18px;
    font-family: "微软雅黑", Arial, Helvetica, sans-serif;
  }
  nav a:hover{
    text-decoration: none;
  }

  .cb-topnav a {
    margin: 0px 5px;
    padding: 0px 8px;
  }
  .cb-topnav a span:first-child{
    z-index: 2;
    display: block;
  }
  .cb-topnav a span:last-child{
    z-index: 1;
    display: block;
    font: 12px Georgia, serif;
    color: #999;
    text-align: center;
    opacity: 0;
    -webkit-transition: -webkit-transform 0.3s,opacity 0.3s;
    -moz-transition: -moz-transform 0.3s,opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  .cb-topnav a:hover span:last-child,.cb-topnav a:focus span:last-child {
    opacity: 1;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    transform: translateY(0);

  }

  #cb-topnav-current span:first-child{
    text-shadow: 3px 1px 1px #004B80;
    font-weight: bold;
  }
  .en {
    color: #999;
    font-size: 12px;
    z-index: 1;
    display: block;
  }
  #cb-topnav-current {
    color: #004B80;
  }

</style>
