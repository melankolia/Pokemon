import { initialPokemonState } from "../state/pokemon.state";
import { SET_POKEMON_LIST } from "../constant/mutations.type";

const state = {
    pokemon: initialPokemonState()
};

const getters = {
    getPokemonList(state) {
        return state.pokemon;
    }
};

const actions = {};

const mutations = {
    [SET_POKEMON_LIST](state, payload) {
        state.pokemon = [ ...payload ];
    }
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
  };
  