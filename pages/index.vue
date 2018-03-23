<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  mounted() {
    // axios.get('http://172.20.7.111:8082/mall/sub/sub-query', {
    //   params: {
    //     type: 2,
    //     status: 1,
    //     province: '江苏省',
    //     city: '苏州市',
    //     pageNo: 1,
    //     pageSize: 5
    //   }
    // }).then(res => {

    // })
    axios.get('/mall/getLocate').then(
      res=> {

      }
    )
  }
};
</script>

<style scoped>
.title {
  margin: 50px 0;
}
</style>
