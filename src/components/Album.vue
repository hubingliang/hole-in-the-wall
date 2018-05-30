<template>
    <div class="Album animated fadeInRight">
        <div class="wrapper">
            <ul class="topBar" id="topBar">
                <router-link to="/Album/like">
                    <li class="tag">LIKES</li>
                </router-link>
                <router-link to="/Album/jazz">
                    <li class="tag">JAZZ</li>
                </router-link>
                <router-link to="/Album/happy">
                    <li class="tag">HAPPY</li>
                </router-link>
                <router-link to="/Album/sunny">
                    <li class="tag">SUNNY</li>
                </router-link>
                <router-link to="/Album/english">
                    <li class="tag">ENGLISH</li>
                </router-link>
                <router-link to="/Album/fingerStyle">
                    <li class="tag">FINGERSTYLE</li>
                </router-link>
            </ul>
        </div>
        <router-view v-bind:musicData="musicData" v-bind:current="current" />
    </div>
</template>

<script>
import List from "./Album/List";
export default {
    props: ["current", "musicData"],
    components: {
        List
    },
    mounted() {
        this.scrollbar();
    },
    methods: {
        scrollbar: function(params) {
            var outDiv = document.getElementById("topBar");
            outDiv.onwheel = function(event) {
                event.preventDefault();
                var step = 50;
                if (event.deltaY < 0) {
                    this.scrollLeft -= step;
                } else {
                    this.scrollLeft += step;
                }
            };
        }
    }
};
</script>

<style lang="less" scoped>
.Album {
    width: 430px;
    height: 100vh;
    background: gray;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: -28px 0px 227px 3px rgba(0, 0, 0, 0.48);
    .wrapper {
        height: 80px;
        overflow: hidden;
        ul {
            padding: 20px 40px;
            list-style: none;
            width: 430px;
            height: 100px;
            display: flex;
            align-items: center;
            overflow: auto;
            li {
                color: white;
                font-size: 16px;
                margin-right: 20px;
            }
        }
    }
}
</style>
