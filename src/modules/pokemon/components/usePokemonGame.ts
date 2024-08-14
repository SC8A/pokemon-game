import pokemonApi from '../api/pokemonApi';
import { GameStatus, type Pokemon, type PokemonListReponse } from '../interfaces/index.interfaces';
import { computed, onMounted, ref } from 'vue';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }
    gameStatus.value = GameStatus.Lost;
    return;
  };
  const pokemonOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(
    () => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)],
  );
  const getPokemons = async () => {
    const response = await pokemonApi.pokemonApi.get<PokemonListReponse>('/?limit=151');
    const pokemonsArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id, //The + is to become the id in a number explicility
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany); // Cut the first 4
    pokemons.value = pokemons.value.slice(howMany); // taking the rest of the array
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });
  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    //Methods
    getNextRound,
    randomPokemon,
    checkAnswer,
    // hasW  on,
  };
};
