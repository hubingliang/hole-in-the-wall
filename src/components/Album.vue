<template>
  <div class="Album animated fadeInRight">
        <ul class="topBar">
                <router-link to="/Album/like"><li class="tag">LIKES</li></router-link>
                <router-link to="/Album/jazz"><li class="tag">JAZZ</li></router-link>
                <router-link to="/Album/happy"><li class="tag">HAPPY</li></router-link>
                <router-link to="/Album/sunny"><li class="tag">SUNNY</li></router-link>
        </ul>
        <router-view :sunnyList="sunnyList" :currentList="currentList" :currentMusic="currentMusic" :jazzList="jazzList" :likeList="likeList" :happyList="happyList"/>
  </div>
</template>

<script>
import List from './Album/List'
export default {
    props:['currentMusic','happyList','jazzList','likeList','currentList','sunnyList'],
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
