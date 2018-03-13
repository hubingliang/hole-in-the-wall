<template>
  <div id="app">
    <Player v-bind:currentMusic="currentMusic"></Player>
    <router-view v-bind:musics="musics" v-bind:currentMusic="currentMusic" v-bind:XWlist="XWlist"/>
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
      },
      playList: [],
      XWlist: [],
      musicsIds: []
    }
  },
  components: {
    Player
  },
  mounted(){
    this.AV()
    this.start()
    this.getPlayList()
    this.getMusicsId()
  },
  methods:{
    AV: function(){
      var APP_ID = 'h6cX3hTUNLmcMuii5PVooVXT-gzGzoHsz';
      var APP_KEY = '5VKLcP36cCBI2YbaAEpV8dy0';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    start: function(){
      var query = new AV.Query('Music');
      query.get('5a9d240b128fe1189bf1f582').then( (music) => {
        this.musics = music.attributes.music
      }, function (error) {
        // 异常处理
      });
    },
    getPlayList: function(){
      var query = new AV.Query('playList');
      query.get('5aa74116a22b9d0045985ab2').then( (playList) => {
        this.XWlist = playList.attributes.json.result.tracks
        let urls = playList.attributes.musicsUrl.data
        console.log(this.XWlist.id)
        for(let i = 0;i<this.XWlist.length;i++){
          this.musicsIds[i] = this.XWlist[i].id
          this.XWlist[i].url = `http://music.163.com/song/media/outer/url?id=${this.XWlist[i].id}.mp3`
        }
        console.log(this.musicsIds)
      }, function (error) {
        console.log(error)
      });
    },
    getMusicsId: function(){
      var query = new AV.Query('playList');
      query.get('5aa74116a22b9d0045985ab2').then( (playList) => {
        for(let i = 0;i<this.XWlist.length;i++){
          this.musicsIds[i] = this.XWlist[i].id
        }
        console.log(this.musicsIds)
      }, function (error) {
        console.log(error)
      });
    }
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
