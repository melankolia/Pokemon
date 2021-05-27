<template>
    <v-simple-table
        style="background-color: #285068"
    >
        <template v-slot:default>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        HP
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats.hp }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats.hp)"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats.hp)"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        Attack
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats.attack }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats.attack)"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats.attack)"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        Defense
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats.defense }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats.defense)"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats.defense)"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        Sp. Atk
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats['special-attack'] }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats['special-attack'])"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats['special-attack'])"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        Sp. Def
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats['special-defense'] }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats['special-defense'])"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats['special-defense'])"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-subtitle-2 font-weight-medium" style="width: 30%">
                    <p class="mb-2">
                        Speed
                    </p>
                </td>
                <td class="white--text text-subtitle-2 font-weight-regular">
                    <div class="d-flex align-center justify-center">
                        <p class="mb-2 mr-4">
                            {{ PokemonDetail.stats.speed }}
                        </p>
                        <v-progress-linear
                            :color="isBelow50(PokemonDetail.stats.speed)"
                            class="mb-2"
                            rounded
                            :value="toPercentage(PokemonDetail.stats.speed)"
                        ></v-progress-linear>
                    </div>
                </td>
            </tr>
        </template>
    </v-simple-table>
</template>

<script>
const detail =  {
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        ['special-attack']: 0,
        ['special-defense']: 0,
        speed: 0,
        total: 0
    }
}
export default {
    props: {
        PokemonDetail: { type: Object, required: true, default: () => detail }
    },
    methods: {
        isBelow50(item) {
            return this.toPercentage(item) < 40 ? "error" : "success"
        },
        toPercentage(item, max = 200) {
            return Math.round((item * 100) / max)
        }
    },
    watch: {
        PokemonDetail: {
            handler(val) {
                console.log(val);
            },
            deep: true
        }
    }
}
</script>

<style scoped>
tr.noBorder td {
  border: 0px !important;
}
</style>