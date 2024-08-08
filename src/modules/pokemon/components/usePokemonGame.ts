import pokemonApi from '../api/pokemonApi';
import { GameStatus, type Pokemon, type PokemonListReponse } from '../interfaces/index.interfaces';
import { computed, onMounted, ref } from 'vue';
export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
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

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany); // Cut the first 4
    pokemons.value = pokemons.value.slice(howMany); // taking the rest of the array
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
    console.log(randomPokemon);
    console.log(pokemonOptions.value);
  });
  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    //Methods
    getNextOptions,
    randomPokemon,
  };
};
