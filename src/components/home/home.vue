<template lang="html">
  <div>
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../public/header'
  import Footer from '../public/footer'
  import Main from './main'

  export default {
    components:{
      Header,
      Footer,
      Main
    }
  }


</script>

<style scoped>

</style>
