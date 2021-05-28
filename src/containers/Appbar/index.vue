<template>
    <v-app-bar
      app
      color="#f6e652"
      elevate-on-scroll
      height="56"
    >
      <div style="width: 8%">
        <v-scroll-x-transition>
          <v-img 
            v-show="notHome"
            width="80" 
            contain 
            src="@/assets/Pokelogo.png"
          />
        </v-scroll-x-transition>
      </div>
      <v-tabs
        v-model="tab"
        color="#2a3d84"
        background-color="transparent"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-img
        alt="Vuetify Logo"
        class="shrink"
        contain
        src="@/assets/pokemon.svg"
        transition="scale-transition"
        width="20"
      />
    </v-app-bar>
</template>

<script>
import { HOME, POKEDEX } from "@/router/name.types";

export default {
  data() {
    return {
      links: [HOME.ROOT, POKEDEX.ROOT],
      tab: this.$route.meta?.index
    }
  },
  watch: {
    tab(val) {
      this.tab = val;
      this.$router.replace({ name: this.links[val] });
    },
  },
  computed: {
    notHome() {
      return this.$route.name !== HOME.ROOT;
    }
  }
}
</script>

<style>

</style>