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
            al: {
                picUrl: 'http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png',
                album: 'Mercy Mountain'
            },
            artists: [
                { name: 'Moses Gunn Collective' }
            ],
        },
        lastMusic: {
            id: 34200497,
            url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
            name: "Hole in the wall",
            author: "Moses Gunn Collective",
            al: {
                picUrl: 'http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png',
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
        gradients: ['linear-gradient(to right, #134e5e, #71b280)',
            'linear-gradient(to right, #2bc0e4, #eaecc6)',
            'linear-gradient(to right, #16222a, #3a6073)',
            'linear-gradient(to right, #ff8008, #ffc837)',
            'linear-gradient(to right, #eb3349, #f45c43)',
            'linear-gradient(to right, #dd5e89, #f7bb97)',
            'linear-gradient(to right, #aa076b, #61045f)',
            'linear-gradient(to right, #ff512f, #dd2476)',
            'linear-gradient(to right, #403b4a, #e7e9bb)',
            'linear-gradient(to right, #3ca55c, #b5ac49)']
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
            if (Array.isArray(payload)) {
                state.currentList = payload
            } else {
                state.lastMusic = state.currentMusic
                state.currentMusic = payload
            }
        },
        changeGradient(state) {
            const app = document.getElementById('app')
            app.style.background = `${state.gradients[Math.floor(Math.random() * state.gradients.length + 1) - 1]}`
        }
    }
})
