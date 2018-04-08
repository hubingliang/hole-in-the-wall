<template>
    <div class="controllerBox animated fadeInLeft">
        <svg class="loop icon" aria-hidden="true" @click="changeLoop()">
            <use xlink:href="#icon-suijibofang" v-show="this.$store.state.currentLoop.random"></use>
            <use xlink:href="#icon-danquxunhuan" v-show="this.$store.state.currentLoop.single"></use>
        </svg>
        <div class="describe">
            <img :src="this.$store.state.currentMusic.album.blurPicUrl" alt="" class="img">
            <div class="name">{{ this.$store.state.currentMusic.name }}</div>
            <div class="author">{{ this.$store.state.currentMusic.artists[0].name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listShow: false,
            singleShow: false,
            randomShow: false,
            loops: ["random", "listLoop", "singleLoop"]
        };
    },
    mounted() {
    },
    methods: {
        changeLoop: function() {
            this.$store.commit("changeLoop")
        },
        random: function() {
            let musicMumber = this.currentList.length;
            let i = Math.floor(Math.randomShow() * (musicMumber + 1));
            let audio = document.getElementById("audio");
            this.currentMusic.cover = this.currentList[i].album.blurPicUrl;
            this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${
                this.currentList[i].id
            }.mp3`;
            this.currentMusic.name = this.currentList[i].name;
            this.currentMusic.author = this.currentList[i].artists[0].name;
            setTimeout(() => {
                audio.play();
                this.rotate = true;
                this.playing = true;
            }, 500);
        },
        singleLoop: function() {
            let i = this.currentList.findIndex((value, index, arr) => {
                return value === this.currentMusic;
            });
            let audio = document.getElementById("audio");
            this.currentMusic.cover = this.currentList[i].album.blurPicUrl;
            this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${
                this.currentList[i].id
            }.mp3`;
            this.currentMusic.name = this.currentList[i].name;
            this.currentMusic.author = this.currentList[i].artists[0].name;
            setTimeout(() => {
                audio.play();
                this.rotate = true;
                this.playing = true;
            }, 500);
        },
        listLoop: function() {
            var i = this.currentList.findIndex((value, index, arr) => {
                return value === this.currentMusic;
            });
            if ((i = this.currentList.length)) {
                i = 0;
            } else {
                i = i + 1;
            }
            let audio = document.getElementById("audio");
            this.currentMusic.cover = this.currentList[i].album.blurPicUrl;
            this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${
                this.currentList[i].id
            }.mp3`;
            this.currentMusic.name = this.currentList[i].name;
            this.currentMusic.author = this.currentList[i].artists[0].name;
            setTimeout(() => {
                audio.play();
                this.rotate = true;
                this.playing = true;
            }, 500);
        }
    }
};
</script>


<style lang="less" scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.controllerBox {
    width: 430px;
    height: 100vh;
    background: gray;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: -28px 3px 227px 0px rgba(0, 0, 0, 0.48);
    order: -1;
    position: relative;
    user-select: none;
    .loop {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 1px;
        padding: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
    }
    .describe {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //padding: 100px 0px;
        color: white;
        font-weight: bold;
        img {
            width: 200px;
            height: 200px;
        }
        .name {
            margin: 50px 20px 20px 20px;
            font-size: 35px;
            text-align: center;
        }
        .author {
            font-size: 20px;
            margin-bottom: 80px;
        }
    }
}
</style>
