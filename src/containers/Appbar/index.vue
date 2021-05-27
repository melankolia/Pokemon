<template>
      <v-app-bar
      app
      color="yellow accent-3"
      dark
      elevate-on-scroll
      height="50"
    >
      <div class="d-flex align-center">
        <v-btn
          @click="$router.replace('/')"
          icon
          class="ml-4"
        >
          <v-img 
            width="80" 
            contain 
            src="@/assets/Pokelogo.png"
          />
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn 
          icon
          @click="$router.replace('/')"
        >
          <v-img
            alt="Vuetify Logo"
            class="shrink"
            contain
            src="@/assets/pokemon.svg"
            transition="scale-transition"
            width="20"
          />
        </v-btn>
      </div>
    </v-app-bar>
</template>

<script>
export default {
}
</script>

<style>

</style>