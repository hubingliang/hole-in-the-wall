<template>
  <div id="app">
    <Player></Player>
    <router-view/>
  </div>
</template>

<script>
import Player from './components/Player'
export default {
  name: 'App',
  components: {
    Player
  },
  mounted(){
    this.start()
  },
  methods:{
    start: function(){
      //获取域名
      let host = window.location.host;
      let host2 = document.domain; 

      //获取页面完整地址
      let url = window.location.href;
      console.log(host)
      console.log(host2)
      console.log(url)
      var APP_ID = 'h6cX3hTUNLmcMuii5PVooVXT-gzGzoHsz';
      var APP_KEY = '5VKLcP36cCBI2YbaAEpV8dy0';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
#app {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(./assets/BG.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}
.box{
  width: 200px;
  height: 200px;
  background: red;
}
</style>
