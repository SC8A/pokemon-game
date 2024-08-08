<template>
    <section v-if="isLoading || randomPokemon.id === null"
        class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Wait please</h1>
        <h3 class="animate-pulse">Charging Pokemons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="m-5">Whos is this Pokemon?</h1>
        <h3>{{ randomPokemon.name }}</h3>
        <!-- Pokemon picture -->
        <PokemoPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
        <!-- Pokemon Options -->
        <PokemonOptions :options="options" @selected-option="onSelectedOption" />
    </section>
</template>
<script setup lang="ts">
import PokemonOptions from '../composables/PokemonOptions.vue';
import PokemoPicture from '../composables/PokemonPicture.vue';
import { usePokemonGame } from '../components/usePokemonGame';
import { GameStatus } from '../interfaces/game-status.enum';

const { gameStatus, isLoading, pokemonOptions: options, randomPokemon } = usePokemonGame()

const onSelectedOption = (value: number) => {
    console.log({ value })
}
</script>