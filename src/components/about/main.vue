<template>
  <div>
    <div class="box">
      <h1 class="cb-titleNav">
        <span>成功需要努力，成功需要实力与运气！</span>
        <a href="index.html">网站首页</a>
        <a href="#">关于我</a>
      </h1>
    </div>
    <article class="cb-aboutCon">
      <div class="cb-about left">
        <h2>Just about CityBoy</h2>
        <ul>
          <p>
            人生就是一个得与失的过程，而我却是一个幸运者，失去的永远比得到的多。生活的压力迫使我放弃了轻松的前台接待，放弃了体面的编辑，换来虽有些蓬头垢面的工作，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习使用Photoshop、Flash、Dreamweaver、ASP、PHP、JSP...中激发了兴趣，然后越走越远....</p>

          <p>
            人生就是一个得与失的过程，而我却是一个幸运者，失去的永远比得到的多。生活的压力迫使我放弃了轻松的前台接待，放弃了体面的编辑，换来虽有些蓬头垢面的工作，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习使用Photoshop、Flash、Dreamweaver、ASP、PHP、JSP...中激发了兴趣，然后越走越远....</p>

          <p>
            人生就是一个得与失的过程，而我却是一个幸运者，失去的永远比得到的多。生活的压力迫使我放弃了轻松的前台接待，放弃了体面的编辑，换来虽有些蓬头垢面的工作，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习使用Photoshop、Flash、Dreamweaver、ASP、PHP、JSP...中激发了兴趣，然后越走越远....</p>

        </ul>
      </div>
      <aside class="right">
        <div class="cb-about_c">
          <p>网名：<span>cityboy</span> | 城市男孩</p>
          <p>姓名：李蒋 </p>
          <p>生日：1994-04-18</p>
          <p>籍贯：广东省―茂名市</p>
          <p>现居：广东-佛山</p>
          <p>职业：ios开发、web前端开发</p>
          <p>GitHub：<a href="#">GitHub地址</a></p>
          <p>简书：<a href="#">简书地址</a></p>
        </div>
      </aside>
    </article>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .cb-aboutCon{
    width: 1000px;
    margin: 10px auto;
    background: url(../../assets/images/aboutphoto.jpg) no-repeat bottom right;
  }

  .cb-about{
    width: 740px;
    min-height: 600px;
    overflow: hidden;
    background: url(../../assets/images/r_line.jpg) repeat-y right;
  }
  .cb-about ul{
    width: 710px;
    margin: 20px 0;
  }
  .cb-about p{
    margin-bottom: 15px;
    font: 16px '微软雅黑',Arial,Helvetica,sans-serif;
    text-indent:2em;
  }
  .cb-about_c p{
    height: 25px;
    line-height: 25px;
  }
  .cb-about_c p span{
    color: #70DBDB;
  }
  .cb-about_c p a{
    color: #004B80;
  }
</style>
