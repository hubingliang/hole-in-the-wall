<template>
  <div class="player animated fadeIn">
    <div class="discBox" draggable="true">
        <img class="disc" src="../assets/disc-plus.png" alt="">
        <img class="disc_light" :class="{rotate: rotate ,norotate: !rotate}" src="../assets/disc_light-plus.png" alt="">
        <img class="cover" :class="{rotate: rotate ,norotate: !rotate}" id="cover" :src="currentMusic.cover" alt="">
    </div>
    <audio id="audio" :src="currentMusic.url"></audio>
  </div>
</template>

<script>
export default {
  name: 'Player',
  data () {
    return {
      playing: false,
      rotate: false,
    }
  },
  props:['currentMusic','currentList'],
  mounted(){
    this.disc()
  },
  methods:{
    play: function(){
      let audio = document.getElementById('audio')  
      if(this.playing === false){
          this.rotate = true
          this.playing = true
          audio.play()
      }else{
          this.rotate = false
          this.playing = false
          audio.pause()
      }
    },
    disc: function(){
      let { styler, spring, listen, pointer, value } = window.popmotion
      let disc = document.querySelector('.discBox')
      let divStyler = styler(disc)
      let ballXY = value({ x: 0, y: 0 }, divStyler.set)
      let homePage = window.location.href
      let albumPage = window.location.href + 'Album/like'
      let LyricPage = window.location.href + 'Controller'
      let audio = document.getElementById('audio')  
      audio.onended = ()=> {
        this.nextMusic()
      };
      listen(disc, 'mousedown touchstart')
        .start((e) => {
          e.preventDefault()
          pointer(ballXY.get()).start(ballXY)
        })

      listen(document, 'mouseup touchend')
        .start(() => {
          let endX = ballXY.get().x
          let endY = ballXY.get().y
          if(endX > 100){
            window.location.href = albumPage
          }else if(Math.abs(endX) < 100 && endX !== 0){
            if(Math.abs(endY) > 150){
              this.nextMusic()
            }else{
              this.play()
            }
          }else if(endX < -100){
            if(window.location.href === albumPage){
              window.location.href = homePage
            }else{
              window.location.href = LyricPage
            }
          }else if(endY > 300){
            
          }
          spring({
            from: ballXY.get(),
            velocity: ballXY.getVelocity(),
            to: { x: 0, y: 0 },
            stiffness: 200,
            // mass: 1,
            // damping: 10
          }).start(ballXY)
        })
    },
    nextMusic: function(){
      let musicMumber = this.currentList.length
      let i = Math.floor(Math.random()*(musicMumber+1))
      let audio = document.getElementById('audio')  
      this.currentMusic.cover = this.currentList[i].album.blurPicUrl
      this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${this.currentList[i].id}.mp3`
      this.currentMusic.name = this.currentList[i].name
      this.currentMusic.author = this.currentList[i].artists[0].name
      setTimeout(() => {
        audio.play()
        this.rotate = true
        this.playing = true
      }, 500);
    }
  }
}
</script>

<style lang='less' scoped>
@keyframes circle{
    0% {
        transform: rotate(0deg); 
    } 
    100% {
        transform: rotate(360deg); 
    } 
}
.player{
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 470px;
  justify-content: center;
  align-items: center;
  .discBox{
    width: 470px;
    height: 470px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 35px;
    top: 35px;
    z-index: 1;
    margin-bottom: 40px;
    .disc_light{
        position: absolute;
        width: 470px;
    }
    .disc{
        position: absolute;
        width: 470px;
        height: 470px;
    }
    .cover{
        width: 292px;
        height: 292px;
        position: absolute;
        border-radius: 50%;      
    }
    .rotate{
        animation: circle 20s infinite linear;
    }
    .norotate{
        animation: circle 20s infinite linear;
        animation-play-state: paused;
    }
  }
  .about{
    color: white;
    .name{
      font-size: 40px;
    }
  }
}

</style>
