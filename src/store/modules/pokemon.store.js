import { initialPokemonState } from "../state/pokemon.state";
import { SET_POKEMON_LIST, SET_LOADING, SET_ETC, RESET_STATE } from "../constant/mutations.type";
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
        listPokemon = listPokemon.slice(offset, (limit + offset));
        return {
            listPokemon,
            totalPage: state.totalPage
        }
    },
    getLoading(state) {
        return state.pokemon.loading;
    },
    getEtc(state) {
        return state.pokemon
    },
    filteringData: (state) => (search, limit, offset) => {
        let listPokemon = [...state.pokemon.listPokemon];
        let totalPage = 0;

        listPokemon = listPokemon.filter(e => e.name.includes(search));
        totalPage = Math.round(listPokemon.length / limit);

        listPokemon = listPokemon.slice(offset, (limit + offset));
        return {
            listPokemon,
            totalPage,
            stop: state.pokemon.limit > state.pokemon.element
        }
    }
};

const actions = {
    [FETCH_POKEMON_LIST]({ commit, state: { pokemon: { limit, offset, urlPage } } }) {
        return new Promise((resolve, reject) => {
            commit(SET_LOADING, true);
            HomeService.getPokemonList({
                limit,
                offset,
                ...Converter.parsingParams(urlPage.next)
            })
            .then(({ data: { results, next, previous, count } }) => {
              results.map(e => {
                e.id = Converter.parsingId(e);
                e.image = Converter.parsingImage(e.id);
              });
              commit(SET_ETC, {
                  urlPage: {
                    next,
                    previous
                  },
                  element: results.length,
                  totalPage: Math.ceil(count/limit)
              })
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
        pokemon.listPokemon = [...pokemon.listPokemon, ...payload];
    },
    [SET_ETC](state, payload) {
        state.pokemon = {
            ...state.pokemon,
            ...payload
        };
    },
    [SET_LOADING](state, payload) {
        state.pokemon.loading = payload;
    },
    [RESET_STATE](state) {
        state.pokemon = {...initialPokemonState()}
    }
};

export default {
    // namespaced: false,
    state,
    getters,
    actions,
    mutations
  };
  