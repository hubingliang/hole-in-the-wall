<template>
  <div class="player animated fadeIn">
    <div class="discBox" draggable="true">
        <img class="disc" src="../assets/disc-plus.png" alt="">
        <img class="disc_light" :class="{rotate: rotate ,norotate: !rotate}" src="../assets/disc_light-plus.png" alt="" id="disc">
        <img class="cover" :class="{rotate: rotate ,norotate: !rotate}" id="cover" :src="current.currentMusic.cover" alt="">
    </div>
    <audio id="audio" :src="current.currentMusic.url"></audio>
  </div>
</template>

<script>
export default {
  name: 'Player',
  data () {
    return {
      playing: false,
      rotate: false,
      currentIndex: 0,
      lastIndex: [0,0],
    }
  },
  props:['current'],
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
      let player = document.querySelector('.player')
      let divStyler = styler(disc)
      let ballXY = value({ x: 0, y: 0 }, divStyler.set)
      let homePage = window.location.href
      let albumPage = window.location.href + 'Album/like'
      let LyricPage = window.location.href + 'Describe'
      let audio = document.getElementById('audio')  
      audio.onended = ()=> {
        this.nextMusic()
      };
      listen(disc, 'mousedown touchstart')
        .start((e) => {
          e.preventDefault()
          pointer(ballXY.get()).start(ballXY)
        })

      listen(player, 'mouseup touchend')
        .start(() => {
          let endX = ballXY.get().x
          let endY = ballXY.get().y
          if(endX > 100){
            if(window.location.href === LyricPage){
              this.$router.push('/')
            }else{
              this.$router.push('/Album/like')
            }
          }else if(Math.abs(endX) < 100 && endX !== 0){
            if(endY > 150){
              this.nextMusic()
              this.rotate = true
              this.playing = true
            }else if(endY < -150){
              this.lastMusic(this.lastIndex)
              this.rotate = true
              this.playing = true
            }else{
              this.play()
            }
          }else if(endX < -100){
            if(window.location.href === albumPage){
              this.$router.push('/')
            }else{
              this.$router.push('/Describe')
            }
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
      switch (this.current.currentLoop) {
        case 'random':
          this.random()
          break;
        case 'singleLoop':
          this.singleLoop()
          break;
        case 'listLoop':
          this.listLoop()
          break;
      }  
    },
    random: function(){
        let musicMumber = this.current.currentList.length
        this.lastIndex[0] = this.lastIndex[1]
        let i = Math.floor(Math.random()*(musicMumber+1))
        this.lastIndex[1] = i
        let audio = document.getElementById('audio')  
        this.current.currentMusic.cover = this.current.currentList[i].album.blurPicUrl
        this.current.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${this.current.currentList[i].id}.mp3`
        this.current.currentMusic.name = this.current.currentList[i].name
        this.current.currentMusic.author = this.current.currentList[i].artists[0].name
        setTimeout(() => {
            audio.play()
            this.rotate = true
            this.playing = true
        }, 500)
    },
    singleLoop: function(){
        let audio = document.getElementById('audio')  
        setTimeout(() => {
            audio.load()
            audio.play()
            this.rotate = true
            this.playing = true
        }, 0)
    },
    listLoop: function(){
        var i = this.lastIndex
        if(i === this.current.currentList.length){
            i = 0
        }else{
            i = i + 1
        }
        this.lastIndex = i
        let audio = document.getElementById('audio')  
        this.current.currentMusic.cover = this.current.currentList[i].album.blurPicUrl
        this.current.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${this.current.currentList[i].id}.mp3`
        this.current.currentMusic.name = this.current.currentList[i].name
        this.current.currentMusic.author = this.current.currentList[i].artists[0].name
        setTimeout(() => {
            audio.play()
            this.rotate = true
            this.playing = true
        }, 500)
    },
    lastMusic:function(lastIndex){
      let i = lastIndex[0]
      let audio = document.getElementById('audio')  
      this.current.currentMusic.cover = this.current.currentList[i].album.blurPicUrl
      this.current.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${this.current.currentList[i].id}.mp3`
      this.current.currentMusic.name = this.current.currentList[i].name
      this.current.currentMusic.author = this.current.currentList[i].artists[0].name
      setTimeout(() => {
          audio.play()
          this.rotate = true
          this.playing = true
      }, 500)
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
    #hidden{
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
