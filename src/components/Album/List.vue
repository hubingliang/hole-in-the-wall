<template>
    <div class="hiddenScroll">
        <div class="disc" v-for="music in this.$store.state.currentList" :key='music.url'>
            <img :src="music.al.picUrl" @click="changeMusic(music)">
            <div class="about">
                <div class="name">{{ music.name }}</div>
                <div class="author">{{ music.ar[0].name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["musicData"],
    methods: {
        resetMusicList: function() {
            this.current.currentList.splice(0, this.current.currentList.length);
            this.current.currentList = [...this.musicData.like.musicList];
        },
        changeMusic: function(music) {
            const audio = document.getElementById("audio");
            setTimeout(() => {
                audio.play();
            }, 0);
            this.$store.commit("changeGradient");
            this.$store.commit("changeMusic", music);
            this.$store.commit("changePlay", true);
        }
    },
    beforeRouteUpdate(to, from, next) {
        const hiddenScroll = document.getElementsByClassName("hiddenScroll")
        hiddenScroll[0].scrollTo(0,0)
        switch (to.params.id) {
            case "like":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.like.musicList
                );
                this.$store.commit("changeListName", "like");
                break;
            case "jazz":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.jazz.musicList
                );
                this.$store.commit("changeListName", "jazz");
                break;
            case "happy":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.happy.musicList
                );
                this.$store.commit("changeListName", "happy");
                break;
            case "sunny":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.sunny.musicList
                );
                this.$store.commit("changeListName", "sunny");
                break;
            case "english":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.english.musicList
                );
                this.$store.commit("changeListName", "english");
                break;
            case "fingerStyle":
                this.$store.commit(
                    "changeMusic",
                    this.musicData.fingerStyle.musicList
                );
                this.$store.commit("changeListName", "fingerStyle");
                break;
        }
        next();
    }
};
</script>


<style lang="less" scoped>
.hiddenScroll {
    padding: 40px;
    padding-top: 10px;
    width: 450px;
    height: calc(100vh - 50px);
    overflow: auto;
    position: relative;
    .disc {
        height: 100px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        img {
            width: 80px;
            height: 80px;
            border-radius: 15px;
            box-shadow: 2px 28px 43px -18px rgba(0, 0, 0, 0.53);
        }
        img:hover {
            border: 1px solid white;
        }
        .about {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100px;
            max-width: 230px;
            margin-left: 40px;
            color: white;
            .author {
                margin-top: 5px;
                color: white;
            }
        }
    }
}
</style>