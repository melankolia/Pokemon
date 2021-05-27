import MainInstance from "../main.instance";
import { POKEMON } from "../constant";

const HomeService = {
    getPokemonList(params) {
        return MainInstance.query(POKEMON, { params })
    },
    getPokemonDetail(id) {
        return MainInstance.fetch(POKEMON, id);
    },
    getPokemonSpecies(url) {
        return MainInstance.query(url);
    },
    getPokemonEvolution(url) {
        return MainInstance.query(url);
    }
};

export default HomeService;