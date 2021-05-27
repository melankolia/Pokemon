<template>
  <v-card
    min-width="200px"
    class="card rounded-xl"
    @click="handleClick"
    :style="{ 'background-image': 'url(' + backgroundImage + ')' }"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
        <div>
            <v-card-title class="white--text text-md-h6 text-sm-h7 font-weight-bold">
                {{ pokemon.name | toTitle }}
            </v-card-title>
            <v-card-subtitle class="text-left font-weight-medium">
                <span v-for="({ type }, index) in PokemonDetail.types" :key="index">
                    {{ type.name | toTitle }},
                </span>
            </v-card-subtitle>
        </div>
        <div class="d-flex flex-column align-end">
            <v-card-title class="white--text text-body-1 font-weight-bold">
                #{{ pokemon.id }}
            </v-card-title>
            <v-avatar
                class="ma-3 image"
                size="100"
                tile
            >
                <v-img :src="pokemon.image"></v-img>
            </v-avatar>
        </div>
    </div>
  </v-card>
</template>

<script>
import PokemonService from "@/services/resources/home.service";
import { DETAIL } from "@/router/name.types";
import Grass from "@/assets/grass.png";

export default {
    props: {
        pokemon: { type: Object, required: false }
    },
    data: () => ({
        backgroundImage: Grass,
        PokemonDetail: {
            types: []
        }
    }),
    methods: {
        handleClick() {
            this.$router.push({ name: DETAIL.ROOT, params: { id: this.pokemon.id } });
        },
        getPokemonDetail(id) {
            console.log({id});
            PokemonService.getPokemonDetail(id)
            .then(({ status, data }) => {
                if (status == 200) {
                    this.PokemonDetail = { ...this.PokemonDetail, ...data };
                }
            })
        }
    },
    mounted() {
        this.getPokemonDetail(this.pokemon.id)
    },
    watch: {
        pokemon: {
            handler(val) {
                val && this.getPokemonDetail(val.id)
            },
            deep: true
        }
    }
}
</script>

<style scoped>

.card {
    background-repeat: repeat;
}

.card:hover {
    transform: translate(-4px);
    box-shadow: 4px 4px 0px lightgrey;
}

.card:active {
    transform: translate(0px);
    box-shadow: 1px 1px 2px lightgrey;
}

.card:hover .image {
    animation: pokeJump 0.4s 2 alternate;
}

@keyframes pokeJump {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-50px);
    }
}
</style>