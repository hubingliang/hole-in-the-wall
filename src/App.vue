<template>
    <div id="app">
        <Player></Player>
        <router-view v-bind:musicData="musicData" />
    </div>
</template>

<script>
import Player from "./components/Player";
export default {
    name: "App",
    data() {
        return {
            current: {
                currentMusic: {
                    id: 34200497,
                    url:
                        "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
                    name: "Hole in the wall",
                    author: "Moses Gunn Collective",
                    al: {
                        picUrl:
                            "http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png",
                        al: "Mercy Mountain"
                    },
                    artists: [{ name: "Moses Gunn Collective" }]
                },
                currentList: [],
                currentLoop: "random",
                currentListName: "like"
            },
            musicList: {
                jazzList: [],
                happyList: [],
                likeList: [],
                sunnyList: [],
                englishList: [],
                fingerStyleList: []
            },
            objectId: {
                jazz: "5aa74116a22b9d0045985ab2",
                happy: "5aa9348c2f301e0036537558",
                like: "5aabdacd9f545448cf28e36e",
                sunny: "5aaf95549f5454250d9a8b12",
                english: "5ac3873bac502e0063c10857",
                fingerStyleList: "5b0e975044d90400681927c4"
            },
            musicData: {
                jazz: {
                    id: "5aa74116a22b9d0045985ab2",
                    musicList: []
                },
                happy: {
                    id: "5aa9348c2f301e0036537558",
                    musicList: []
                },
                like: {
                    id: "5aabdacd9f545448cf28e36e",
                    musicList: []
                },
                sunny: {
                    id: "5aaf95549f5454250d9a8b12",
                    musicList: []
                },
                english: {
                    id: "5ac3873bac502e0063c10857",
                    musicList: []
                },
                fingerStyle: {
                    id: "5b0e975044d90400681927c4",
                    musicList: []
                }
            }
        };
    },
    components: {
        Player
    },
    mounted() {
        this.AV();
        this.getMusicList();
        this.resetGradient();
    },
    methods: {
        AV() {
            var APP_ID = "h6cX3hTUNLmcMuii5PVooVXT-gzGzoHsz";
            var APP_KEY = "5VKLcP36cCBI2YbaAEpV8dy0";

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        getPlayList(obj) {
            const objectId = obj.id;
            const list = obj.musicList;

            var query = new AV.Query("playList");
            query.get(`${objectId}`).then(
                playList => {
                    obj.musicList = [
                        ...list,
                        ...playList.attributes.json.playlist.tracks
                    ];
                    this.$store.commit(
                        "changeMusic",
                        this.musicData.like.musicList
                    );
                },
                function(error) {
                    console.log(error);
                }
            );
        },
        getMusicList() {
            for (const v of Object.values(this.musicData)) {
                this.getPlayList(v);
            }
        },
        resetGradient() {
            this.$store.commit("changeGradient");
        }
    }
};
</script>

<style>
#hidden {
    width: 292px;
    height: 292px;
    position: absolute;
    border-radius: 50%;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
body {
    overflow: hidden;
}
#app {
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
