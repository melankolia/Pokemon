import { initialPokemonState } from "../state/pokemon.state";
import { SET_POKEMON_LIST, SET_LOADING, SET_URL_PAGE } from "../constant/mutations.type";
import { FETCH_POKEMON_LIST } from "../constant/actions.type";
import HomeService from "@/services/resources/home.service";
import Converter from "@/utils/Converter";

const state = {
    pokemon: initialPokemonState()
};

const getters = {
    getAllPokemonList(state) {
        return state.pokemon.listPokemon;
    },
    getPokemonList: (state) => (limit, offset) => {
        let listPokemon = [...state.pokemon.listPokemon];
        return listPokemon.slice(offset, (limit + offset));
    },
    getLoading(state) {
        return state.pokemon.loading;
    },
    filteringData: (state) => (search) => {
        let listPokemon = [...state.pokemon.listPokemon];
        return listPokemon.filter(e => e.name.includes(search))
    }
};

const actions = {
    [FETCH_POKEMON_LIST]({ commit, state: { pokemon: { limit, urlPage } } }) {
        return new Promise((resolve, reject) => {
            commit(SET_LOADING, true);
            HomeService.getPokemonList({
                limit,
                ...Converter.parsingParams(urlPage.next)
            })
            .then(({ data: { results, next } }) => {
              results.map(e => {
                e.id = Converter.parsingId(e);
                e.image = Converter.parsingImage(e);
              });
              console.log(next);
              commit(SET_URL_PAGE, next)
              commit(SET_POKEMON_LIST, results);
              resolve();
            })
            .catch(err => {
              console.error(err);
              reject(err);
            })
            .finally(() => commit(SET_LOADING, false));
        })
      },
};

const mutations = {
    [SET_POKEMON_LIST]({ pokemon }, payload) {
        if (pokemon.urlPage.next) {
            pokemon.listPokemon = [ ...payload ];
        } else {
            pokemon.listPokemon = [...pokemon.listPokemon, ...payload];
        }
    },
    [SET_URL_PAGE](state, payload) {
        state.pokemon.urlPage.next = payload;
    },
    [SET_LOADING](state, payload) {
        state.pokemon.loading = payload;
    },
};

export default {
    // namespaced: false,
    state,
    getters,
    actions,
    mutations
  };
  