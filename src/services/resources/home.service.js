import MainInstance from "../main.instance";
import { POKEMON, POKEMON_SPECIES } from "../constant";

const HomeService = {
    getPokemonList(params) {
        return MainInstance.query(POKEMON, { params })
    },
    getPokemonDetail(id) {
        return MainInstance.fetch(POKEMON, id);
    },
    getPokemonSpeciesById(id) {
        return MainInstance.fetch(POKEMON_SPECIES, id);
    },
    getPokemonSpecies(url) {
        return MainInstance.query(url);
    },
    getPokemonEvolution(url) {
        return MainInstance.query(url);
    }
};

export default HomeService;