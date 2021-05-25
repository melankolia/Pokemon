import MainInstance from "../main.instance";
import { POKEMON } from "../constant";

const HomeService = {
    getPokemonList(params) {
        return MainInstance.query(POKEMON, { params })
    }
};

export default HomeService;