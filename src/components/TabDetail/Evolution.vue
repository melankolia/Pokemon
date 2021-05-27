<template>
<div class="d-flex flex-column">
  <Loading v-if="loading"/>
  <template v-else>
    <p class="white--text text-body-1 font-weight-bold mb-2">
      Evolution Chains
    </p>
    <div v-for="(item, index) in PokemonEvolution" class="d-flex flex-row justify-space-between mb-2" :key="index">
      <div class="d-flex flex-column align-center">
        <img width="100%" :src="item.species.image" />
        <p class="white--text text-caption font-weight-medium mb-2">
            {{ item.species.name | toTitle }}
        </p>
      </div>
      <div class="d-flex flex-column align-center justify-center">
        <p class="white--text text-subtitle-2 font-weight-medium mb-2">
          {{ item.evolves_to.evolution_details[0].trigger.name | toTitle }}
        </p>
        <v-icon
          color="white"
        >
          east
        </v-icon>
        <p class="white--text text-caption font-weight-medium mb-2">
          Lv {{ item.evolves_to.evolution_details[0].min_level }}
        </p>
      </div>
      <div class="d-flex flex-column align-center">
        <img width="100%" :src="item.evolves_to.species.image" />
        <p class="white--text text-caption font-weight-medium mb-2">
          {{ item.evolves_to.species.name | toTitle }}
        </p>
      </div>
    </div>
  </template>
</div>
</template>

<script>
const species = {
  evolution_chain: {
    url: null
  }
};

import HomeService from "@/services/resources/home.service";
import Converter from "@/utils/Converter";
const Loading = () => import("@/components/Loading");

export default {
  props: {
    PokemonSpecies: { type: Object, required: true, default: () => species }
  },
  components: {
    Loading
  },
  data() {
    return {
      loading: true,
      evolution_chain: this.PokemonSpecies?.evolution_chain?.url,
      PokemonEvolution: [],
    }
  },
  methods: {
    getPokemonEvolution(url) {
      this.loading = true;
      HomeService.getPokemonEvolution(url)
      .then(({ status, data }) => {
        if (status == 200) {
          if (data.chain.evolves_to.length > 0) this.divingData(data.chain);
          console.log(this.PokemonEvolution)
        }
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false)
    },
    divingData(obj) {
      if (obj.evolves_to.length > 0) {
        this.PokemonEvolution = [...this.PokemonEvolution, {
          evolution_details: obj.evolution_details,
          evolves_to: 
          {
            evolution_details: obj.evolves_to?.[0]?.evolution_details,
            species: {
              name: obj.evolves_to?.[0]?.species?.name,
              image: Converter.embedImage(obj.evolves_to?.[0]?.species)
            }
          },
          species: {
            name: obj.species.name,
            image: Converter.embedImage(obj.species)
          }
        }];
        this.divingData(obj.evolves_to[0]);
      }
    }
  },
  mounted() {
    this.evolution_chain && this.getPokemonEvolution(this.evolution_chain)
  }
}
</script>

<style>

</style>