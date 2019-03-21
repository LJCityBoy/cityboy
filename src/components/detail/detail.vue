<template>
  <div>
    <Header/>
    <div>
      <div class="box">
        <h1 class="cb-titleNav">
          <span>成功需要努力，成功需要实力与运气！</span>
          <Router-link :to="{name:'home'}">网站首页</Router-link>
          <a href="#">阅读全文</a>
        </h1>
      </div>
      <article class="cb-detailCon">
        <div class="cb-detail left">
          <div class="cb-detail-text">
            <h1>{{dat.title}}</h1>
            <div class="cb-detail-art" v-html="dat.article"></div>
          </div>
          <p class="cb-detail-next right">
            <a href="#">上一篇</a><a href="#">下一篇</a>
          </p>
        </div>
        <aside class="cb-detail-c right">

        </aside>

      </article>
    </div>
    <Footer/>
  </div>

</template>

<script>
  import Header from '../public/header'
  import Footer from '../public/footer'
  export default {
    name: "detail",
    components:{
      Header,
      Footer
    },
    data(){
      return {
          dat:this.$route.query.dat
      }
    },
    created(){
      // console.log(this.$route.params.dat);
      // this.dat = this.$route.query.dat
    }
  }
</script>

<style scoped>
  .cb-detailCon{
    width: 1000px;
    margin: 10px auto;
  }
  .cb-detail{
    background: url(../../assets/images/r_line.jpg) repeat-y right;
    width: 740px;
    min-height: 600px;
  }
  .cb-detail-text{
    width: 710px;
  }
  .cb-detail-text h1{
    text-align: center;
    margin-bottom: 10px;
  }
  .cb-detail-text p{
    font: 16px '微软雅黑',Arial,Helvetica,sans-serif;
    margin-bottom: 10px;
    text-indent: 2em;
  }
  .cb-detail-next {
    margin-right: 20px;
    margin-top: 20px;
  }
  .cb-detail-next a{
    width: 80px;
    height: 30px;
    line-height: 30px !important;
    background-color: #004B80;
    color: white;
    font: 16px '微软雅黑',Arial,Helvetica,sans-serif;
    text-align: center;
    display: block;
    float: left;
    margin-left: 5px;
  }

</style>
