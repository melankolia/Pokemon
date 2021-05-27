<template>
  <div class="d-flex flex-column flex-md-row" style="height: 100%;">
    <div class="d-flex flex-column flex-grow-1 pa-12 justify-center">
      <div class="d-flex justify-center">
        <v-img 
          contain 
          src="@/assets/Pokelogo.png"
          class="responsive__img"
        />
      </div>
      <div class="d-flex flex-column justify-center">
        <div class="d-flex flex-column align">
          <p class="text-h4 font-weight-black">
            Gotta Catch 'em All!
          </p>
          <p class="text-caption">
            Pokemon, also known as Pokcet Monsters in Japan, <br />
            is a Japanese Media franchise managed by the Pokemon Company, <br />
            a company founded by Nintendo
          </p>
          <div class="input__responsive">
            <v-text-field
              label="Search"
              prepend-inner-icon="search"
              filled
              rounded
              single-line
              x-small
              @focus="handleFocus"
            />
          </div>
        </div>
      </div>
    </div> 
    <div class="d-flex pa-12 flex-column right__container align-center justify-center container">
      <img src="@/assets/pikachu.png" class="children"/>
    </div>
  </div>
</template>

<script>
import { POKEDEX } from "@/router/name.types";

export default {
  methods: {
    handleFocus() {
      this.$router.push({ name: POKEDEX.ROOT });
    }
  }
}
</script>

<style scoped>

.right__container {
  background-color: #f6e652;
  width: 60vw;
}

@media only screen and (min-width: 961px) {
  .container {
    transform:skewX(-10deg);
    margin: 0 -150px 0 0;
  }

  .children {
    transform: skewX(10deg);
    width: 70%;
  }

  .input__responsive {
    width: 40%;
  }
}

@media only screen and (max-width: 960px) {
  .responsive__img {
    width: 80%
  }
  .right__container {
    width: 100vw;
  }
  .children {
    width: 50%;
  }
  .input__responsive {
    width: 100%;
  }
}
</style>
