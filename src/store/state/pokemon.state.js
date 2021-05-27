export const initialPokemonState = () => ({
    listPokemon: [],
    loading: false,
    urlPage: {
        next: null,
        previous: null
    },
    limit: 40,
    offset: 0,
    element: 0,
    totalPage: null
});