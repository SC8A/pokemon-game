<template>
    <section>
        <img v-if="showPokemon" :src="pokemonImage" alt="Pokemon image from pokeapi" class="fade-in h-[200px]">
        <img v-else :src="pokemonImage" alt="Pokemon image from pokeapi" class="brightness-0 h-[200px]">
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    pokemonId: number
    showPokemon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    showPokemon: true
})

const pokemonImage = computed(() =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
)

</script>

<style scoped>
img {
    user-select: none;
    /* The user cannot move the imagen with click */
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>