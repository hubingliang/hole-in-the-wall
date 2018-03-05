<template>
  <div id="app">
    <Player v-bind:currentMusic="currentMusic"></Player>
    <router-view v-bind:musics="musics" v-bind:currentMusic="currentMusic"/>
  </div>
</template>

<script>
import Player from './components/Player'
export default {
  name: 'App',
  data(){
    return{
      musics: [],
      currentMusic: {
          id: 1,
          url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
          name: "Hole in the wall",
          author: "Moses Gunn Collective",
          album: "Mercy Mountain",
          cover: "http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png"
      }
    }
  },
  components: {
    Player
  },
  mounted(){
    this.start()
  },
  methods:{
    start: function(){
      var APP_ID = 'h6cX3hTUNLmcMuii5PVooVXT-gzGzoHsz';
      var APP_KEY = '5VKLcP36cCBI2YbaAEpV8dy0';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
      var query = new AV.Query('Music');
      query.get('5a9d240b128fe1189bf1f582').then( (music) => {
        this.musics = music.attributes.music
      }, function (error) {
        // 异常处理
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
