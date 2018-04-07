<template>
  <div id="app">
    <Player v-bind:current="current"></Player>
    <router-view v-bind:current="current" v-bind:musicList="musicList" v-on:changeFunction="changeFunction"/>
  </div>
</template>

<script>
import Player from './components/Player'
export default {
  name: 'App',
  data(){
    return{
      current: {
        currentMusic: {
            id: 1,
            url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
            name: "Hole in the wall",
            author: "Moses Gunn Collective",
            album: "Mercy Mountain",
            cover: "http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png"
        },
        currentList: [],
        currentLoop: 'random',
        currentListName: 'like'
      },
      musicList: {
        jazzList: [],
        happyList: [],
        likeList : [],
        sunnyList : [],
        englishList: []
      },
      objectId: {
        jazz : '5aa74116a22b9d0045985ab2',
        happy : '5aa9348c2f301e0036537558',
        like : '5aabdacd9f545448cf28e36e',
        sunny : '5aaf95549f5454250d9a8b12',
        english: '5ac3873bac502e0063c10857'
      }
    }
  },
  components: {
    Player
  },
  mounted(){
    this.AV()
    this.getHappy()
    this.getJazz()
    this.getLike()
    this.getsunny()
    this.getEnglish()
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
    getPlayList: function(objectId,list){
      
      var query = new AV.Query('playList')
      query.get(`${objectId}`).then( (playList) => {
        for(let i = 0;i<playList.attributes.json.result.tracks.length;i++){
          list.push(playList.attributes.json.result.tracks[i])
          list[i].url = `http://music.163.com/song/media/outer/url?id=${list[i].id}.mp3`
        }
        this.current.currentList = [...this.musicList.likeList]
      }, function (error) {
        console.log(error)
      })
      
    },
    getJazz: function(){
      this.getPlayList(this.objectId.jazz,this.musicList.jazzList)
    },
    getEnglish: function(){
      this.getPlayList(this.objectId.english,this.musicList.englishList)
    },
    getHappy: function(){
      this.getPlayList(this.objectId.happy,this.musicList.happyList)
    },
    getLike: function(){
      this.getPlayList(this.objectId.like,this.musicList.likeList)
    },
    getsunny: function(){
      this.getPlayList(this.objectId.sunny,this.musicList.sunnyList)
    },
    changeFunction: function(fn){
      switch (fn) {
        case 'random':
          this.current.currentLoop = 'random'
          break;
        case 'singleLoop':
          this.current.currentLoop = 'singleLoop'
          break;
        case 'listLoop':
          this.current.currentLoop = 'listLoop'
          break;
      }  
      console.log('this.current.currentLoop' ,this.current.currentLoop)
    },
  }
}
</script>

<style>
#hidden{
  width: 292px;
  height: 292px;
  position: absolute;
  border-radius: 50%;  
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
body{
  overflow: hidden;
}
#app {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
 background: #536976;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #292E49, #536976);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #292E49, #536976); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  overflow: hidden;
}
</style>
