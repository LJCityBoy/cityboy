<template>
  <div>
    <div id="cb-container" class="cb-banner">
      <section class="box ">
        <div class="cb-banner-section">
          <ul class="cb-texts">
            <p>行到水穷处</p>
            <p>坐看云起时</p>
            <p>豁然开朗.....</p>
          </ul>
          <div class="cb-avatar"><a href="#"><span>CityBoy</span></a></div>
        </div>

      </section>
    </div>
    <article>
      <h2 class="cb-title-tj">
        <p>文章<span>推荐</span></p>
      </h2>
      <!--左侧-->
      <div class="cb-bloglist left">
        <div v-if="articles.length>0" v-for=" article in articles ">
          <h3>{{article.title}}</h3>
          <figure><img src="../../assets/images/003.png" alt="cityboy"></figure>
          <ul>
            <div class="cb-bloglist-art" v-html="article.article"></div>
            <div class="cb-boli"></div>
            <Router-link class="cb-readmored" :to="{ name:'detail',query:{dat:article}}">阅读全文>></Router-link>
          </ul>
          <p class="cb-dateview"><span>2019-02-12</span><span>作者：{{article.author}}</span><span>个人博客[<a href="https://threejs.org">博客名称</a>]</span></p>
        </div>
        <div v-if="articles==''">
          <h3>暂无数据</h3>
        </div>
      </div>
      <!--右侧-->
      <aside class="right">
        <div class="cb-weather">
          <iframe width="250" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="http://i.tianqi.com/index.php?c=code&id=12&icon=1&num=1"></iframe>
        </div>
        <div class="cb-news">
          <h3>
            <p>最新<span>文章</span></p>
          </h3>
          <ul class="cb-rank">
            <li><a href="#">three.js开发指南</a></li>
            <li><a href="#">three.js开发指南</a></li>
            <li><a href="#">three.js开发指南</a></li>
            <li><a href="#">three.js开发指南</a></li>
            <li><a href="#">three.js开发指南</a></li>
          </ul>
          <h3 class="cb-links">
            <p>友情<span>连接</span></p>
          </h3>
          <ul class="cb-website">
            <li><a href="#">three.js官网</a></li>
            <li><a href="#">Vue官网</a></li>
            <li><a href="#">简书</a></li>
          </ul>
          <div class="cb-weixin"><img src="../../assets/images/weixin.jpg" alt="微信"></div>
        </div>
      </aside>
    </article>
  </div>
</template>

<script>
  import banner from '../../assets/js/banner'
  export default {
    data() {
      return {
        articles: ''
      }
    },
    created(){
      {
        //获取推荐文章
        let self = this; //防止this在ajax里混乱不清
         $.ajax({
          url:'http://132.232.40.236:9001/api/get_index_recommended',
          type:'get',
          data:{
            count: 4 //随机获取4条数据
          },
          success:function (obj) {
            console.log("请求到数据",obj.data);
            self.articles = obj.data ;
          },
          error:function (err) {
            console.log(err);
          }
        })
      }
    },
    methods:{
        // ajax:function () {
        //   var m =
        // }
    },
    mounted(){
      banner.action();

    }
  }
</script>

<style scoped>

  .cb-banner{
    width: 100%;
    height: 260px;
    overflow: hidden;
  }
  .cb-banner-section{
    position: absolute;
    width: 1000px;
    z-index: 1;

  }
  .cb-texts{
    width: 350px;
    line-height: 30px;
    float: left;
    margin: 60px 5px;
    font-size: 14px;
    color: #70DBDB;
  }
  .cb-texts p{
    -webkit-transform: translate(60px);
    -moz-transform: translate(60px);
    -ms-transform: translate(60px);
    -o-transform: translate(60px);
    transform: translate(60px);
  }
  .cb-texts p:nth-child(1){
    /*3s慢慢出来，然后1s向后退*/
    -webkit-animation: animations 3s ease-out 1s backwards;
    -moz-animation: animations 3s ease-out 1s backwards;
    -o-animation: animations 3s ease-out 1s backwards;
    animation: animations 3s ease-out 1s backwards;
  }
  .cb-texts p:nth-child(2){
    /*3s慢慢出来，然后1s向后退*/
    -webkit-animation: animations 3s ease-out 4s backwards;
    -moz-animation: animations 3s ease-out 4s backwards;
    -o-animation: animations 3s ease-out 4s backwards;
    animation: animations 3s ease-out 4s backwards;
  }
  .cb-texts p:nth-child(3){
    /*5s闪出，然后1s向后退*/
    -webkit-animation: animations1 5s ease-in-out 7s backwards;
    -moz-animation: animations1 5s ease-in-out 7s backwards;
    -o-animation: animations1 5s ease-in-out 7s backwards;
    animation:  animations1 5s ease-in-out 7s backwards;
  }

  @-webkit-keyframes animations{
    0%{-webkit-transform: translate(0);opacity: 0}
    50%{-webkit-transform: translate(30px);opacity: .5}
    100%{-webkit-transform: translate(60px);opacity: 1}
  }
  @-moz-keyframes animations{
    0%{-webkit-transform: translate(0);opacity: 0}
    50%{-webkit-transform: translate(30px);opacity: .5}
    100%{-webkit-transform: translate(60px);opacity: 1}
  }
  @-o-keyframes animations{
    0%{-webkit-transform: translate(0);opacity: 0}
    50%{-webkit-transform: translate(30px);opacity: .5}
    100%{-webkit-transform: translate(60px);opacity: 1}
  }
  @keyframes animations{
    0%{-webkit-transform: translate(0);opacity: 0}
    50%{-webkit-transform: translate(30px);opacity: .5}
    100%{-webkit-transform: translate(60px);opacity: 1}
  }

  /*第三行动画*/
  @-webkit-keyframes animations1{
    0%{opacity: 0}
    40%{opacity: .8}
    45%{opacity: .3}
    55%{opacity: .8}
    60%{opacity: .3}
    100%{opacity: 1}
  }
  @-moz-keyframes animations1{
    0%{opacity: 0}
    40%{opacity: .8}
    45%{opacity: .3}
    55%{opacity: .8}
    60%{opacity: .3}
    100%{opacity: 1}
  }
  @-o-keyframes animations1{
    0%{opacity: 0}
    40%{opacity: .8}
    45%{opacity: .3}
    55%{opacity: .8}
    60%{opacity: .3}
    100%{opacity: 1}
  }
  @keyframes animations1{
    0%{opacity: 0}
    40%{opacity: .8}
    45%{opacity: .3}
    55%{opacity: .8}
    60%{opacity: .3}
    100%{opacity: 1}
  }

  /*头像*/
  .cb-avatar{
    float: right;
    margin: 40px;
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 100%;
  }
  .cb-avatar a{
    display: block;
    padding-top: 97px;
    width: 130px;
    background: url(../../assets/images/photos3.jpg) no-repeat;
    background-size: 130px 130px;
  }
  .cb-avatar a span{
    display: block;
    width: 130px;
    height: 55px;
    margin-top: 63px;
    padding-top: 8px;
    text-align: center;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    -webkit-transition: .2s ease-in-out margin-top;
    -moz-transition: .2s ease-in-out margin-top;
    -o-transition: .2s ease-in-out margin-top;
    transition: .2s ease-in-out margin-top;
  }

  .cb-avatar a:hover span {
    display: block;
    margin-top: 0px;
  }

  /*文章推荐*/
  h2.cb-title-tj{
    font: 18px "微软雅黑",Arial, Helvetica,sans-serif;
    color: #444;
    font-weight: bold;
    background: url(../../assets/images/h_line.jpg) repeat-x 20px center;
  }
  h2.cb-title-tj span{color: #fe5187}
  h2.cb-title-tj p{
    background-color: #fff;
    width: 90px;
  }
  .cb-bloglist{
    width: 740px;
    min-height: 765px;
    overflow: hidden;
    background: url(../../assets/images/r_line.jpg) repeat-y right;
  }
  .cb-bloglist h3{
    margin: 20px 0px 10px 0px;
    color: #333;
    font: 15px '微软雅黑',Arial,Helvetica,sans-serif;
    font-weight: bold;
  }
  .cb-bloglist figure{
    width: 183px;
    float: left;
  }
  .cb-bloglist figure img{
    width: 175px;
    padding: 4px;
    border: solid 1px #f4f2f2;
  }
  .cb-bloglist ul{
    position: relative;
    float: left;
    width: 520px;
    margin: 10px 0px 0px 15px;
    display: block;
  }
  .cb-bloglist-art{
    height: 70px;
    overflow: hidden;
  }
  .cb-boli{
    width: 520px;
    height: 10px;
    /*background-color:rgba(0.1,0.1,0.1,0.1);*/
    position: absolute;
    bottom: 54px;
    background:#ffffff  center bottom fixed;/* 与上面的bg中的background设置一样 */
    filter: blur(1px);/* 值越大越模糊 */
  }
  .cb-weather{
    background: url(../../assets/images/weather_bg.jpg) no-repeat;
    height: 88px;
    margin: 20px 0;
    padding: 20px 0px 0px 75px;

  }



</style>
