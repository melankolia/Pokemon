<template>
    <v-simple-table
        style="background-color: #285068"
    >
        <template v-slot:default>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Species
                    </p>
                </td>
                <td class="white--text">
                    <p class="text-subtitle-2 font-weight-regular">
                        {{ PokemonSpecies.genera.genus }}
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Height
                    </p>
                </td>
                <td class="white--text">
                    <p class="text-subtitle-2 font-weight-regular">
                        {{ Height }} m
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Weight
                    </p>
                </td>
                <td class="white--text">
                    <p class="text-subtitle-2 font-weight-regular">
                        {{ Weight }} kg
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Abilities
                    </p>
                </td>
                <td class="white--text">
                    <p v-if="PokemonDetail.abilities.length > 0" class="text-subtitle-2 font-weight-regular">
                        <span v-for="(item, index) in PokemonDetail.abilities" :key="index">
                            {{ item.ability.name | toTitle }},
                        </span>
                    </p>
                    <p v-else class="text-subtitle-2 font-weight-regular">
                        ...
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                <p />
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text text-body-1 font-weight-bold" style="width: 30%">
                    <p class="mb-2">
                        Breeding
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Gender Rate
                    </p>
                </td>
                <td class="white--text">
                    <p class="text-subtitle-2 font-weight-regular">
                        {{ PokemonSpecies.gender_rate }}
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Egg Groups
                    </p>
                </td>
                <td class="white--text">
                    <p v-if="PokemonSpecies.egg_groups.length > 0" class="text-subtitle-2 font-weight-regular">
                        <span v-for="(item, index) in PokemonSpecies.egg_groups" :key="index">
                            {{ item.name | toTitle }},
                        </span>
                    </p>
                    <p v-else class="text-subtitle-2 font-weight-regular">
                        ...
                    </p>
                </td>
            </tr>
            <tr class="noBorder">
                <td class="white--text" style="width: 30%">
                    <p class="text-subtitle-2 font-weight-medium">
                        Egg Cycle
                    </p>
                </td>
                <td class="white--text">
                    <p class="text-subtitle-2 font-weight-regular">
                        {{ PokemonSpecies.hatch_counter }}
                        ( {{ EggCycle }} Steps )
                    </p>
                </td>
            </tr>
        </template>
    </v-simple-table>
</template>

<script>
const detail = {
    speciesName: "...",
    height: "...",
    weight: "...",
    abilities: [],
}

const species = {
    genera: {
        genus: "..."
    },
    gender_rate: "...",
    egg_groups: [],
    hatch_counter: "..."
}
export default {
    props: {
        PokemonDetail: { type: Object, required: true, default: () => detail },
        PokemonSpecies: { type: Object, required: true, default: () => species }
    },
    computed: {
        Height() {
            if (typeof this.PokemonDetail.height !== String) {
                return this.PokemonDetail.height / 10;
            }
            return "...";
        },
        Weight() {
            if (typeof this.PokemonDetail.weight !== String) {
                return this.PokemonDetail.weight / 10;
            }
            return "...";
        },
        EggCycle() {
            if (typeof this.PokemonSpecies.hatch_counter !== String) {
                return this.PokemonSpecies.hatch_counter * 255;
            }
            return "..."
        }
    }
}
</script>

<style scoped>
tr.noBorder td {
  border: 0px !important;
}
</style>