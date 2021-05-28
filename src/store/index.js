import Vue from 'vue'
import Vuex from 'vuex'
import Pokemon from "./modules/pokemon.store";
// import createLogger from "vuex/dist/logger";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Pokemon
  },
  plugins: [],
  // plugins: [createLogger({})]
})
