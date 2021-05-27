<template>
      <v-app-bar
      app
      color="yellow accent-3"
      dark
      elevate-on-scroll
      height="50"
    >
      <div class="d-flex align-center">
        <v-btn icon>
          <v-img
            alt="Vuetify Logo"
            class="shrink"
            contain
            src="@/assets/pokemon.svg"
            transition="scale-transition"
            width="20"
            @click="$router.replace('/')"
          />
        </v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>