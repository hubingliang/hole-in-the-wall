<template>
  <div class="Album animated fadeInRight">
        <ul class="topBar">
                <router-link to="/Album/like"><li class="tag">LIKES</li></router-link>
                <router-link to="/Album/jazz"><li class="tag">JAZZ</li></router-link>
                <router-link to="/Album/happy"><li class="tag">HAPPY</li></router-link>
                <router-link to="/Album/sunny"><li class="tag">SUNNY</li></router-link>
                <router-link to="/Album/english"><li class="tag">ENGLISH</li></router-link>
        </ul>
        <router-view v-bind:musicList="musicList" v-bind:current="current"/>
  </div>
</template>

<script>
import List from './Album/List'
export default {
    props:['current','musicList'],
    data(){
        return{
            likeShow : true,
            jazzShow : false,
            happyShow : false,
        }
    },
    components: {
        List
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
        padding: 20px 40px;
        li{
            color: white;
            font-size: 16px;
            margin-right: 20px;
        }
    }
}
</style>
