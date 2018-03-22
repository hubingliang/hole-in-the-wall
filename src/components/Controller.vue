<template>
  <div class="controllerBox animated fadeInLeft">
        <svg class="loop icon" aria-hidden="true">
            <use xlink:href="#icon-yuanxunhuanbofang"></use>
        </svg>
      <div class="controller">
          <div class="item" v-show="listLoop">
                
                <div class="name">列表循环</div>
          </div>
          <div class="item" v-show="singleLoop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuanxunhuanbofang"></use>
                </svg>
                <div class="name"></div>
          </div>
          <div class="item">
              <div class="icon"></div>
              <div class="name"></div>
          </div>
          <div class="item">
              <div class="icon"></div>
              <div class="name"></div>
          </div>
          <div class="item">
              <div class="icon"></div>
              <div class="name"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            listLoop: true,
            singleLoop: true,
            random: true,
            loops: ['random','singleLoop','listLoop'],
            currentLoop: 'random'
        }
    },
    mounted(){
        this.changeLoop()
    },
    methods:{
        changeLoop: function(){
            let { styler, spring, listen, pointer, value } = window.popmotion
            let disc = document.querySelector('.loop')
            let divStyler = styler(disc)
            let ballXY = value({ x: 0, y: 0 }, divStyler.set)
            listen(disc, 'mousedown touchstart')
                .start((e) => {
                    e.preventDefault()
                    pointer(ballXY.get()).start(ballXY)
                })

            listen(document, 'mouseup touchend')
                .start(() => {
                    let endX = ballXY.get().x
                    let endY = ballXY.get().y
                    let i = this.loops.findIndex((value,index,arr)=>{
                        return value === this.currentLoop
                    })
                    switch (i) {
                        case 0:
                            
                            break;
                    
                        default:
                            break;
                    }
                    if(i === 2){
                        this.currentLoop = this.loops[0]
                    }else{
                        this.currentLoop = this.loops[i+1]
                    }
                    console.log(this.currentLoop)
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
.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
}
.controllerBox{
    width: 430px;
    height: 100vh;
    background: gray;
    background: rgba(0,0,0,0.3);
    box-shadow: -28px 3px 227px 0px rgba(0,0,0,0.48);
    order: -1;
    position: relative;
    .loop{
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 1px;
        padding: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255,255,255,0.7);
    }
    .controller{
        display: flex;
        flex-direction: column;
        //justify-content: center;
        align-items: center;
        padding: 100px 0px;
        .item{
            color: rgb(90, 82, 233);
            display: flex;
            align-items: center; 
            margin-bottom: 20px;
            .icon{
                font-size: 1px;
                padding: 10px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(255,255,255,0.7);
            }
            .name{
                color: white;
                font-size: 20px;
                margin-left: 20px;
            }
        }
    }
}
</style>
