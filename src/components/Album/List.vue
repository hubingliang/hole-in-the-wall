<template>
    <div class="hiddenScroll">
        <div class="disc" v-for="music in list" :key='music.url'>
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
    props:['current','musicList'],
    data(){
        return{
            list : []
        }
    },
    mounted(){
        this.start()
    },
    methods: {
        start: function(){
            this.current.currentList.splice(0,this.current.currentList.length)
            this.list = [...this.musicList.likeList]
            for(let i = 0;i<this.musicList.likeList.length;i++){
                this.current.currentList[i] = this.musicList.likeList[i]
            }
        },
        changeMusic: function(music){
            this.current.currentMusic.cover = music.album.blurPicUrl
            this.current.currentMusic.url = music.url
            this.current.currentMusic.name = music.name
            this.current.currentMusic.author = music.artists[0].name
        },
    },
    beforeRouteUpdate (to,from,next) {
        switch(to.params.id){
            case 'like' :
                this.list = [...this.musicList.likeList]
                this.current.currentList.splice(0,this.current.currentList.length)
                for(let i = 0;i<this.musicList.likeList.length;i++){
                    this.current.currentList[i] = this.musicList.likeList[i]
                }
                break
            case 'jazz' :
                this.list = [...this.musicList.jazzList]
                this.current.currentList.splice(0,this.current.currentList.length)
                for(let i = 0;i<this.musicList.jazzList.length;i++){
                    this.current.currentList[i] = this.musicList.jazzList[i]
                }
                break
            case 'happy' :
                this.list = [...this.musicList.happyList]
                this.current.currentList.splice(0,this.current.currentList.length)
                for(let i = 0;i<this.musicList.happyList.length;i++){
                    this.current.currentList[i] = this.musicList.happyList[i]
                }
                break
            case 'sunny' :
                this.list = [...this.musicList.sunnyList]
                this.current.currentList.splice(0,this.current.currentList.length)
                for(let i = 0;i<this.musicList.sunnyList.length;i++){
                    this.current.currentList[i] = this.musicList.sunnyList[i]
                }
            case 'english' :
                this.list = [...this.musicList.englishList]
                this.current.currentList.splice(0,this.current.currentList.length)
                for(let i = 0;i<this.musicList.englishList.length;i++){
                    this.current.currentList[i] = this.musicList.englishList[i]
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