<template>
  <v-simple-table
    style="background-color: #285068;"
    class="table__overflow"
  >
    <template v-slot:default>
      <tr class="noBorder">
        <td class="white--text" style="width: 30%">
          <p class="mb-2 text-body-1 font-weight-bold">
            Moves
          </p>
        </td>
        <td>
          <p />
        </td>
      </tr>
      <tr v-for="(item, index) in PokemonDetail.moves" class="noBorder" :key="index">
        <td class="white--text" style="width: 30%">
          <p class="mb-2 text-subtitle-2">
            Lv {{ item.move.level }}
          </p>
        </td>
        <td class="white--text">
          <p class="mb-2 text-subtitle-2 font-weight-medium">
            {{ item.move.name | toTitle }}
          </p>
        </td>
      </tr>
    </template>
  </v-simple-table>
</template>

<script>
const detail = {
  moves: []
}
export default {
  props: {
    PokemonDetail: { type: Object, required: true, default: () => detail },
  }
}
</script>

<style scoped>
tr.noBorder td {
  border: 0p !important;
}

.table__overflow {
  max-height: 70vh;
  overflow: scroll;
}
</style>