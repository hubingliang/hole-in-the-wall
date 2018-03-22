<template>
    <div class="hiddenScroll">
        <div class="disc" v-for="music in musicList" :key='music.url'>
            <img :src="music.album.blurPicUrl" @click="changeMusic(music)">
            <div class="about">
                <div class="name">{{ music.name }}</div>
                <div class="author">{{ music.artists[0].name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['currentMusic','happyList','jazzList','likeList','currentList','sunnyList'],
    data(){
        return{
            musicList : []
        }
    },
    mounted(){
        this.start()
    },
    methods: {
        start: function(){
            this.currentList.splice(0,this.currentList.length)
            this.musicList = [...this.likeList]
            for(let i = 0;i<this.likeList.length;i++){
                this.currentList[i] = this.likeList[i]
            }
        },
        changeMusic: function(music){
            this.currentMusic.cover = music.album.blurPicUrl
            this.currentMusic.url = music.url
            this.currentMusic.name = music.name
            this.currentMusic.author = music.artists[0].name
        },
    },
    beforeRouteUpdate (to,from,next) {
        switch(to.params.id){
            case 'like' :
                this.musicList = [...this.likeList]
                this.currentList.splice(0,this.currentList.length)
                for(let i = 0;i<this.likeList.length;i++){
                    this.currentList[i] = this.likeList[i]
                }
                break
            case 'jazz' :
                this.musicList = [...this.jazzList]
                this.currentList.splice(0,this.currentList.length)
                for(let i = 0;i<this.jazzList.length;i++){
                    this.currentList[i] = this.jazzList[i]
                }
                break
            case 'happy' :
                this.musicList = [...this.happyList]
                this.currentList.splice(0,this.currentList.length)
                for(let i = 0;i<this.happyList.length;i++){
                    this.currentList[i] = this.happyList[i]
                }
                break
            case 'sunny' :
                this.musicList = [...this.sunnyList]
                this.currentList.splice(0,this.currentList.length)
                for(let i = 0;i<this.sunnyList.length;i++){
                    this.currentList[i] = this.sunnyList[i]
                }
                break
        }
        next()
    }
}
</script>


<style lang="less" scoped>
.hiddenScroll{
    padding: 40px;
    padding-top: 10px;
    width: 450px;
    overflow: hidden;
    height: calc(100vh - 50px);
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
</style>