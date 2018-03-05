<template>
  <div class="player animated fadeIn">
    <div class="discBox" draggable="true">
        <img class="disc" src="../assets/disc-plus.png" alt="">
        <img class="disc_light" v-bind:class="{rotate: rotate ,norotate: !rotate}" src="../assets/disc_light-plus.png" alt="">
        <img class="cover" v-bind:class="{rotate: rotate ,norotate: !rotate}" id="cover" :src="currentMusic.cover" alt="">
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
  props:['currentMusic'],
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
      let albumPage = window.location.href + 'Album'

      listen(disc, 'mousedown touchstart')
        .start((e) => {
          e.preventDefault()
          pointer(ballXY.get()).start(ballXY)
        })

      listen(document, 'mouseup touchend')
        .start(() => {
          let end = ballXY.get().x
          if(end > 100){
            window.location.href = albumPage
          }else if(Math.abs(end) < 100 && end !== 0){
            this.play()
          }else if(end < -100){
            window.location.href = homePage
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
