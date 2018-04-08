import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentMusic: {
            id: 34200497,
            url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
            name: "Hole in the wall",
            author: "Moses Gunn Collective",
            album: {
                blurPicUrl: 'http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png',
                album: 'Mercy Mountain'
            },
            artists: [
                { name: 'Moses Gunn Collective' }
            ],
        },
        lastMusic:{
            id: 34200497,
            url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
            name: "Hole in the wall",
            author: "Moses Gunn Collective",
            album: {
                blurPicUrl: 'http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png',
                album: 'Mercy Mountain'
            },
            artists: [
                { name: 'Moses Gunn Collective' }
            ],
        },
        currentList: [],
        currentLoop: {
            random: true,
            single: false,
        },
        currentListName: 'like',
        currentPlay: false,
        homePage: true,
    },
    mutations: {
        changePlay(state, payload) {
            state.currentPlay = payload
        },
        changeComponent(state, payload) {
            state.homePage = payload
        },
        changeListName(state, payload) {
            state.currentListName = payload
        },
        changeLoop(state, payload) {
            state.currentLoop.random = !state.currentLoop.random
            state.currentLoop.single = !state.currentLoop.single
        },
        changeMusic(state, payload) {
            if(Array.isArray(payload)){
                state.currentList = payload
            }else{
                state.lastMusic = state.currentMusic
                state.currentMusic = payload                
            }
        },
    },
    getters: {
        doneTodos: state => {
            return state.count
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        }
    }
})
