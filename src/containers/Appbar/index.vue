<template>
      <v-app-bar
      app
      color="grey lighten-2"
      dark
      elevate-on-scroll
      height="50"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/pokemon.svg"
          transition="scale-transition"
          width="20"
        />

      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>