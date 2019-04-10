<template>
<div>
  <div class="box">
    <h1 class="cb-titleNav">
      <span>成功需要努力，成功需要实力与运气！</span>
      <a href="index.html">网站首页</a>
      <a href="#">杂事分类</a>
    </h1>
  </div>
  <article class="cb-choresCon">
    <div class="cb-chores left">
      <div class="cb-chores-lis" v-for="article in articles">
        <h3>{{article.title}}</h3>
        <figure><img src="../../assets/images/003.png" alt="cityboy"></figure>
        <ul>
          <div class="cb-bloglist-art" v-html="article.article"></div>
          <div class="cb-boli"></div>
          <Router-link class="cb-readmored" :to="{ name:'detail',query:{dat:article}}">阅读全文>></Router-link>
        </ul>
        <p class="cb-dateview"><span>2019-02-12</span><span>作者：{{article.author}}</span><span>个人博客[<a href="https://threejs.org">博客名称</a>]</span></p>
      </div>

      <div class="cb-page">
        <a href="#"><b>18</b></a>
        <b>1</b>
        <a href="#">2</a>
        <a href="#">&gt;</a>
        <a href="#">&gt;&gt;</a>
      </div>
    </div>
    <aside class="cb-chores-c right">
      <div class="cb-rnav">
        <ul>
          <li class="cb-rnav-c1"><a href="#">javascript</a></li>
          <li class="cb-rnav-c2"><a href="#">Object-C</a></li>
          <li class="cb-rnav-c3"><a href="#">HTML5</a></li>
          <li class="cb-rnav-c4"><a href="#">CSS3</a></li>
        </ul>
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
    export default {
      data(){
        return {
          articles : ''
        }
      },
      created(){
        {
          //获取推荐文章
          let self = this; //防止this在ajax里混乱不清
          $.ajax({
            url:'http://132.232.40.236:9001/api/get_indexArticle_byPage',
            type:'get',
            data:{
              pageLength: 20, //每页条数
              pageIndex: 1 //第几页
            },
            success:function (obj) {
              console.log("c请求到数据",obj.data);
              if (obj.data.length >=2){
                self.articles = obj.data[1];
              }

            },
            error:function (err) {
              console.log(err);
            }
          })
        }
      },
      mounted(){
        
      }
    }
</script>

<style scoped>
  .cb-choresCon{
    width: 1000px;
    margin: 10px auto;
  }
  .cb-chores{
    background: url(../../assets/images/r_line.jpg) repeat-y right;
    width: 740px;
    min-height: 600px;
  }
  .cb-chores h3{
    color: #333;
    margin: 20px 0px 10px 0px;
    font: 15px '微软雅黑',Arial,Helvetica,sans-serif;
    font-weight: bold;
  }
  .cb-chores figure{
    width: 183px;
    float: left;
  }
  .cb-chores figure img{
    width: 175px;
    padding: 4px;
    border: solid 1px #f4f2f2;
  }
  .cb-chores  ul{
    width: 520px;
    float: left;
    margin: 10px 0 0 15px;
    display: block;
    position: relative;
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

</style>
