<template>
  <div class="Album animated fadeInRight">
      <div class="disc">
          <img src="..\assets\BG.jpg" alt="">
          <div class="about">
              <div class="name">Watson Blues</div>
              <div class="author">Tommy Emmanuel</div>
          </div>
      </div>
      <div class="disc">
          <img src="..\assets\BG.jpg" alt="">
          <div class="about">
              <div class="name">Watson Blues</div>
              <div class="author">Tommy Emmanuel</div>
          </div>
      </div>
      <div class="disc">
          <img src="..\assets\BG.jpg" alt="">
          <div class="about">
              <div class="name">Watson Blues</div>
              <div class="author">Tommy Emmanuel</div>
          </div>
      </div>
      <div class="disc">
          <img src="..\assets\BG.jpg" alt="">
          <div class="about">
              <div class="name">Watson Blues</div>
              <div class="author">Tommy Emmanuel</div>
          </div>
      </div>
      <div class="disc">
          <img src="..\assets\BG.jpg" alt="">
          <div class="about">
              <div class="name">Watson Blues</div>
              <div class="author">Tommy Emmanuel</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  mounted(){
      this.album()
  },
  methods:{
    album: function(){
        let { styler, spring, listen, pointer, value } = window.popmotion
        let album = document.querySelector('.Album')
        let divStyler = styler(album)
        let ballXY = value({ x: 0, y: 0 }, divStyler.set)

        listen(album, 'mousedown touchstart')
            .start((e) => {
                e.preventDefault()
                pointer(ballXY.get()).start(ballXY)
            })

        listen(document, 'mouseup touchend')
            .start(() => {
                spring({
                    from: ballXY.get(),
                    velocity: ballXY.getVelocity(),
                    to: { x: 0, y: 0 },
                    stiffness: 200,
                    // mass: 1,
                    // damping: 10
                }).start(ballXY)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.Album{
    width: 400px;
    height: 100vh;
    background: gray;
    background: rgba(0,0,0,0.3);
    padding: 40px;
    padding-top: 40px;
    box-shadow: -28px 0px 227px 3px rgba(0,0,0,0.48);
    .disc{
        height: 100px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        img{
            width: 80px;
            height: 80px;
            border-radius: 15px;
            box-shadow: 2px 28px 43px -18px rgba(0,0,0,0.53);
        }
        img:hover{
            border: 1px solid white;
        }
        .about{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
            margin-left: 40px;
            color: white;
            .author{
                margin-top: 5px;
                color: white;
            }
        }
    }
}
</style>
