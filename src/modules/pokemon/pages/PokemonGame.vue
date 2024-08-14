<template>
    <section v-if="isLoading || randomPokemon.id === null" class="bg-white flex flex-col justify-center items-center ">
        <h1 class="text-3xl">Wait please</h1>
        <h3 class="animate-pulse">Charging Pokemons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center ">
        <h1 class="m-5">Who is this Pokemon?</h1>

        <!-- Pokemon picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
        <!-- Pokemon Options -->
        <PokemonOptions :options="options" @selected-option="checkAnswer"
            :block-selection="gameStatus !== GameStatus.Playing" :correct-answer="randomPokemon.id" />
    </section>
    <div class="flex items-center justify-center">
        <button class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700" v-if="gameStatus !== GameStatus.Playing"
            @click="getNextRound()">
            Play again
        </button>
    </div>
</template>
<script setup lang="ts">
import PokemonOptions from '../composables/PokemonOptions.vue';
import PokemonPicture from '../composables/PokemonPicture.vue';
import { usePokemonGame } from '../components/usePokemonGame';
import { GameStatus } from '../interfaces/game-status.enum';

const { gameStatus, isLoading, pokemonOptions: options, randomPokemon, checkAnswer, getNextRound } = usePokemonGame()

</script>