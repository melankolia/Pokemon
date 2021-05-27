<template>
<v-container style="height: 100%">
  <div v-if="!loading" class="d-flex flex-column flex-md-row">
    <div 
      class="d-flex flex-grow-1 flex-column justify-space-around pa-6 background" 
      v-bind="maxWidth"
      :style="{ 'background-image': 'url(' + backgroundImage + ')' }"
    >
      <div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column">
            <p class="white--text text-h4 font-weight-bold">
              {{ PokemonDetail.name | toTitle }}
            </p>
            <div class="d-flex flex-row">
              <v-chip
                v-for="({ type }, index) in PokemonDetail.types"
                small
                class="mr-2"
                color="green darken-2"
                text-color="white"
                :key="index"
              >
                <span class="font-weight-bold">{{ type.name | toTitle }}</span>
              </v-chip>
            </div>
          </div>
          <div class="d-flex flex-row flex-grow-1 align-center justify-end">
            <v-chip
              color="blue darken-1"
              class="pa-5"
            >
              <span class="white--text text-h6 font-weight-bold">#{{ PokemonDetail.id }}</span>
            </v-chip>
          </div>
        </div>
        <v-divider class="mt-4 font-weight-bold"></v-divider>
      </div>
      <div class="d-flex flex-column justify-center">
        <div class="d-flex justify-center align-center">
          <img width="60%" :src="PokemonDetail.sprites.front_default" />
        </div>
        <v-card-actions
          class="rounded-xl description"
        >
          <v-col cols="12">
            <p class="font-weight-bold white--text">
              Description <br/>
              <span class="text-justify font-weight-regular text-caption" 
                v-html="PokemonSpecies.flavor_text_entries.flavor_text" />
            </p>
          </v-col>
        </v-card-actions>
      </div>
      <v-divider class="d-sm-none"></v-divider>
    </div>
    <div 
      class="pa-10 background__dialog d-flex flex-column" 
    >
      <v-btn-toggle
          v-model="tab"
          tile
          dark
          color="white"
          group
          mandatory
        >
          <v-btn 
            v-for="(item, index) in items"
            :value="item.component"
            :key="index"
            class="rounded-lg"
            small
          >
            {{ item.name }}
          </v-btn>
      </v-btn-toggle>
      <div class="pa-4">
        <keep-alive>
          <component 
            :is="tab" 
            :PokemonDetail="PokemonDetail" 
            :PokemonSpecies="PokemonSpecies"
          />
        </keep-alive>
      </div>
    </div>
  </div>
  <Loading v-else/>
</v-container>
</template>

<script>
import Grass from "@/assets/grass.png";
import Dialog from "@/assets/dialog.png";
import PokemonService from "@/services/resources/home.service";
import Converter from "@/utils/Converter";
const About = () => import("@/components/TabDetail/About");
const BaseStat = () => import("@/components/TabDetail/BaseStat");
const Evolution = () => import("@/components/TabDetail/Evolution");
const Moves = () => import("@/components/TabDetail/Moves");
const Loading = () => import("@/components/Loading");

export default {
  components: {
    About,
    BaseStat,
    Evolution,
    Moves,
    Loading
  },
  data() {
    return {
      id: this.$route.params?.id,
      items: [
        { name: "About", component: "About" },
        { name: "Base Stat", component: "BaseStat" },
        { name: "Evolution", component: "Evolution" },
        { name: "Moves", component: "Moves" },
      ],
      tab: "About",
      backgroundImage: Grass,
      backgroundDialog: Dialog,
      loading: true,
      PokemonDetail: {
        name: ".......",
        types: [],
        id: "...",
        speciesName: "...",
        height: "...",
        weight: "...",
        abilities: [],
        sprites: {
          front_default: null
        },
        stats: {
          hp: 0,
          attack: 0,
          defense: 0,
          ['special-attack']: 0,
          ['special-defense']: 0,
          speed: 0
        }
      },
      PokemonSpecies: {
        flavor_text_entries: {
          flavor_text: "......"
        },
        genera: {
          genus: "..."
        },
        evolution_chain: null,
        gender_rate: "...",
        egg_groups: [],
        hatch_counter: "..."
      }
    }
  },
  methods: {
    getDetail(id) {
      this.loading = true;
      PokemonService.getPokemonDetail(id)
      .then(({ status, data }) => {
        if (status == 200) {
          data.stats = Converter.arrToObj((e, obj) => obj[e.stat.name] = e.base_stat, data.stats);
          data.moves.map(e => {
            e.move.level = e.version_group_details?.[0].level_learned_at
          });
          data.moves.sort((a, b) => a.move.level - b.move.level);
          this.PokemonDetail = { ...data };
        } else {
          throw "Error"
        }
      })
      .catch(err => {
        console.error(err)
        this.$router.back()
      })
    },
    getDetailSpecies(url) {
      this.loading = true;
      PokemonService.getPokemonSpecies(url)
      .then(({ status, data }) => {
        if (status == 200) {
          data.flavor_text_entries = {...this.PokemonSpecies.flavor_text_entries, 
            ...data.flavor_text_entries.find(e => 
              e.language.name.includes('en') && e.version.name.includes('firered')
            )
          };

          data.genera = {...this.PokemonSpecies.genera, 
            ...data.genera.find(e => e.language.name.includes('en'))};

          this.PokemonSpecies = { ...data };
        } else {
          throw "Error"
        }
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false)
    }
  },
  mounted() {
    this.id && this.getDetail(this.id)
  },
  computed: {
    maxWidth() {
      return this.$vuetify.breakpoint.smAndUp ? {style: 'width: 50vw'} : {}
    }
  },
  watch: {
    PokemonDetail: {
      handler(val) {
        val?.species && this.getDetailSpecies(val.species.url)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.background {
  background-repeat: repeat;
  outline: 5px solid #70c8a0;
}

.background__dialog {
  background-color: #285068;
  border: 5px solid #e0d8e0; 
  outline: 5px solid #c8a848;
}

.description {
  background-color: #1E88E5;
  /* border-left: 6px solid #0D47A1; */
  box-shadow: 4px 4px 0px #0D47A1;
}

div > img {
  animation: pokeJump 0.4s 20 alternate;
}

@keyframes pokeJump {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-30px);
    }
}
</style>