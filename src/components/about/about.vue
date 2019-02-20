<template>
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
      Main,
      Footer
    }
  }

</script>

<style scoped>

</style>
