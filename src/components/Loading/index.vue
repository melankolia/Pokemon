<template>
<div class="d-flex justify-center align-center" style="height: 100%">
  <img 
    class="loading"
    width="160px"
    src="@/assets/pokemon.svg"
  />
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading {
    animation: pokeballRotate 1s infinite linear;
}

@keyframes pokeballRotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>