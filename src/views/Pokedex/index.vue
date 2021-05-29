<template>
  <v-container fluid>
    <p class="font-weight-medium text-h4 py-6 px-2 mb-0">
      <b>POKéDEX</b>
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
      autofocus
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
        <v-col v-for="(item, index) in [...Array(4)]" cols="12" xs="12" sm="4" md="3" :key="index">
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
        <v-btn class="mr-4 rounded-lg" :disabled="isFirst" :loading="loading" @click="() => page--" color="error">
          <v-icon>navigate_before</v-icon>
          Previous
        </v-btn>
        <v-btn class="rounded-lg" :disabled="page >= totalPage" :loading="loading" @click="() => page++" color="primary">
          Next
          <v-icon>navigate_next</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const PokeCard = () => import("@/components/Cards/pokemon");
import { mapActions, mapGetters, mapMutations } from "vuex";
import { FETCH_POKEMON_LIST } from "@/store/constant/actions.type";
import { RESET_STATE, SET_LOADING } from "@/store/constant/mutations.type";

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
    totalPage: 1,
    page: 1,
    limit: 8,
    filtering: false,
  }),
  methods: {
    ...mapActions({fetchData: FETCH_POKEMON_LIST}),
    ...mapMutations({resetState: RESET_STATE, setLoading: SET_LOADING}),
    getList(limit = 8, page = 1) {
      // console.log({type})
      const result = this.getPokemonList(limit, (page - 1) * limit);
      this.listPokemon = [...result.listPokemon];
      this.totalPage = result.totalPage;
    },
    filterData(val, limit = this.limit, page = 1) {
      // console.log({type, val})
      const { listPokemon, totalPage, stop } = this.filteringData(val, limit, (page - 1) * limit);

      if (listPokemon.length < 1) {
        if (!stop) this.fetchingData(() => this.filterData(val, limit));
        else return
        // else if (stop) this.getList()
      } else {
        this.listPokemon = [...listPokemon];
        this.totalPage = totalPage;
      }
    },
    fetchingData(callback) {
      this.fetchData()
      .then(() => {
        callback ? callback() : this.getList(this.limit, this.page);
        this.itemSearch = [...this.getAllPokemonList];
      })
      .catch(err => console.error(err));
    }
  },
  mounted() {
    this.fetchingData();
  },
  watch: {
    search(val) {
      // console.log({search: val})
      this.page = 1;
      this.debounce(() => val ? this.filterData(val) : this.getList());
    },
    select(val) {
      // console.log({select: val})
      val && this.filterData(val)
    },
    page(val) {
      val && this.search ? this.filterData(this.search, this.limit, val) : this.getList(this.limit, val);
    },
  },
  computed: {
    ...mapGetters({ 
      loading: "getLoading", 
      getPokemonList: "getPokemonList",
      filteringData: "filteringData",
      getAllPokemonList: "getAllPokemonList",
      getEtc: "getEtc"
    }),
    isFirst() {
      return this.page <= 1;
    }
  }
}
</script>
