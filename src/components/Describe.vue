<template>
  <div class="controllerBox animated fadeInLeft">
        <svg class="loop icon" aria-hidden="true" @click="changeLoop(current.currentLoop)">
            <use xlink:href="#icon-suijibofang" v-show="randomShow"></use>
            <use xlink:href="#icon-danquxunhuan" v-show="singleShow"></use>
            <use xlink:href="#icon-yuanxunhuanbofang" v-show="listShow"></use>
        </svg>
        <div class="describe">
            <img :src="current.currentMusic.cover" alt="" class="img">
            <div class="name">{{ current.currentMusic.name }}</div>
            <div class="author">{{ current.currentMusic.author }}</div>
        </div>
  </div>
</template>

<script>
export default {
    props:['nextMusic','current'],
    data(){
        return{
            listShow: false,    
            singleShow: false,
            randomShow: false,
            loops: ['random','singleLoop','listLoop'],
        }
    },
    mounted(){
        this.resetLoop()
    },
    methods:{ 
        changeLoop: function(currentLoop){
            var i = this.loops.findIndex((value,index,arr)=>{
                return value === currentLoop
            })
            if(i === 2){
                i = 0
            }else{
                i = i + 1
            }
            switch (i) {
                case 0:
                    this.randomShow = true
                    this.singleShow = false
                    this.listShow = false
                    this.$emit('changeFunction','random')
                    break;
                case 1:
                    this.randomShow = false
                    this.singleShow = true
                    this.listShow = false
                    this.$emit('changeFunction','singleLoop')
                    break;
                case 2:
                    this.randomShow = false
                    this.singleShow = false
                    this.listShow = true
                    this.$emit('changeFunction','listLoop')
                    break;
            }
        },
        random: function(){
            let musicMumber = this.currentList.length
            let i = Math.floor(Math.randomShow()*(musicMumber+1))
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
        },
        singleLoop: function(){
            let i = this.currentList.findIndex((value,index,arr)=>{
                return value === this.currentMusic
            })
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
        },
        listLoop: function(){
            var i = this.currentList.findIndex((value,index,arr)=>{
                return value === this.currentMusic
            })
            if(i = this.currentList.length){
                i = 0
            }else{
                i = i + 1
            }
            let audio = document.getElementById('audio')  
            this.currentMusic.cover = this.currentList[i].album.blurPicUrl
            this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${this.currentList[i].id}.mp3`
            this.currentMusic.name = this.currentList[i].name
            this.currentMusic.author = this.currentList[i].artists[0].name
            setTimeout(() => {
                audio.play()
                this.rotate = true
                this.playing = true
            }, 500)
        },
        resetLoop: function(){
            switch (this.current.currentLoop) {
                case 'random':
                    this.randomShow = true
                    break;
                case 'singleLoop':
                    this.singleShow = true
                    break;
                case 'listLoop':
                    this.listShow = true
                    break;
            }  
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
    user-select:none;
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
    .describe{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //padding: 100px 0px;
        color: white;
        font-weight: bold;
        img{
            width: 200px;
            height: 200px;
        }
        .name{
            margin: 50px 20px 20px 20px;
            font-size: 35px;
            
        }
        .author{
            font-size: 20px;
            margin-bottom: 80px;
        }
    }
}
</style>
