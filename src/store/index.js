import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentMusic: {
            id: 1,
            url: "http://ac-h6cX3hTU.clouddn.com/70e8d84cadcc6de6e746.mp3",
            name: "Hole in the wall",
            author: "Moses Gunn Collective",
            album: "Mercy Mountain",
            cover: "http://ac-h6cX3hTU.clouddn.com/61a482e96ea53c5a280d.png"
        },
        currentList: [],
        currentLoop: 'random',
        currentListName: 'like',
        currentPlay: false
    },
    mutations: {
      changePlay (state,payload) {
        state.currentPlay = payload
      }
    },
    getters: {
        doneTodos: state => {
          return state.count
        },
        doneTodosCount: (state, getters) =>{
            return getters.doneTodos.length
        }
    }
})
