<template>
  <v-container fluid>
    <p class="font-weight-medium text-h4 py-6 px-2 mb-0">
      <b>Pokedex</b>
    </p>
    <v-autocomplete
      v-model="select"
      :search-input.sync="search"
      :items="itemSearch"
      :loading="loading"
      flat
      filled
      rounded
      single-line
      label="Search"
      prepend-inner-icon="search"
      item-text="name"
      item-value="name"
      clearable
      @click:clear="() => getList()"
    >
      <template v-slot:selection="{ item }">
        <span>{{ item.name | toTitle }}</span>
      </template>
      <template v-slot:item="{ item }">
        <span>{{ item.name | toTitle }}</span>
      </template>
    </v-autocomplete>
    <v-container fluid>
      <v-row v-if="!loading" align="center" justify="center">
        <v-col v-for="(data, index) in listPokemon" cols="12" xs="12" sm="4" md="3" :key="index">
          <PokeCard :pokemon="data"/>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(item, index) in [...Array(10)]" cols="12" xs="12" sm="4" md="3" :key="index">
          <v-skeleton-loader
            class='mb-6 rounded-xl'
            elevation="1"
            :boilerplate="false"
            min-width="200px"
            min-height="140px"
            type="table-heading, list-item-two-line"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-row class="text-center mt-12 mb-2" align="center" justify="center">
      <v-col cols="12">
        <v-btn class="mr-4 rounded-lg" :disabled="isFirst" @click="() => page--" color="error">
          <v-icon small>navigate_before</v-icon>
          Previous
        </v-btn>
        <v-btn class="rounded-lg" @click="() => page++" color="primary">
          Next
          <v-icon>navigate_next</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const PokeCard = () => import("@/components/Cards/pokemon");
import { mapActions, mapGetters } from "vuex";
import { FETCH_POKEMON_LIST } from "@/store/constant/actions.type";

export default {
  components: {
    PokeCard
  },
  data: () => ({
    listPokemon: [],
    itemSearch: [],
    count: null,
    select: null,
    search: null,
    page: 1,
    limit: 20,
  }),
  methods: {
    ...mapActions({fetchData: FETCH_POKEMON_LIST}),
    getList(limit = 20, page = 1) {
      this.listPokemon = [...this.getPokemonList(limit, (page - 1) * limit)];
    },
    filterData(val) {
      const filtered = this.filteringData(val);
      if (filtered.length < 1) {
        this.fetchingData();
      } else {
        this.listPokemon = [...filtered];
      }
    },
    fetchingData() {
      this.fetchData()
      .then(() => {
        this.getList(this.limit, this.page);
      })
      .catch(err => console.error(err));
    }
  },
  mounted() {
    this.fetchingData();
  },
  watch: {
    search(val) {
      this.page = 1;
      this.debounce(() => val ? this.filterData(val) : this.getList());
    },
    select(val) {
      val ? this.filterData(val) : this.getList();
    },
    page(val) {
      val && this.getList(this.limit, val);
    },
    loading(val) {
      !val && (this.itemSearch = [...this.getAllPokemonList]);
    }
  },
  computed: {
    ...mapGetters({ 
      loading: "getLoading", 
      getPokemonList: "getPokemonList",
      filteringData: "filteringData",
      getAllPokemonList: "getAllPokemonList",
    }),
    isFirst() {
      return this.page <= 1;
    }
  }
}
</script>
