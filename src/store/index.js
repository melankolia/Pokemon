import Vue from 'vue'
import Vuex from 'vuex'
import Pokemon from "./modules/pokemon.store";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Pokemon
  }
})
