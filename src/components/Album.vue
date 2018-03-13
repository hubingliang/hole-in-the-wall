<template>
  <div class="Album animated fadeInRight">
        <ul class="topBar">
                <li class="tag" >LIKES</li>
                <li class="tag">STATIONS</li>
        </ul>
        <div class="hiddenScroll">
            <div class="disc" v-for="music in musics" v-bind:key='music.name'>
                <img :src="music.cover" @click="changeMusic(music)">
                <div class="about">
                    <div class="name">{{ music.name }}</div>
                    <div class="author">{{ music.author }}</div>
                </div>
            </div>
            <div class="disc" v-for="music in XWlist" v-bind:key='music.name'>
                <img :src="music.album.blurPicUrl" @click="changeMusic(music)">
                <div class="about">
                    <div class="name">{{ music.name }}</div>
                    <div class="author">{{ music.artists[0].name }}</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props:['musics','currentMusic','XWlist'],
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
        },
        changeMusic: function(music){
            this.currentMusic.cover = music.album.blurPicUrl
            this.currentMusic.url = music.url
            this.currentMusic.name = music.name
            this.currentMusic.author = music.artists[0].name
        },
    },
}
</script>

<style lang="less" scoped>
.Album{
    width: 430px;
    height: 100vh;
    background: gray;
    background: rgba(0,0,0,0.3);
    box-shadow: -28px 0px 227px 3px rgba(0,0,0,0.48);
    ul{
        list-style: none;
        width: 430px;
        height: 100px;
        display: flex;
        align-items: center;
        padding: 20px 30px;
        li{
            color: white;
            font-size: 16px;
            margin-right: 20px;
        }
    }
    .hiddenScroll{
        padding: 40px;
        padding-top: 10px;
        width: 450px;
        overflow: hidden;
        height: 100vh;
        overflow: auto;
        position: relative;
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
}
</style>
