<template>
  <div
    v-if="pokemonData && pokemonDescription"
    class="pokemon-card nes-container is-rounded"
  >
    <div class="pokemon-card__image">
      <img
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
        "
        :alt="pokemonData.name"
      />
    </div>
    <div class="pokemon-card__text text-left">
      <p>Name: {{ pokemonData.name }}</p>
      <p>No. {{ pokemonData.id }}</p>
      <p>
        Type:
        <span
          v-for="(typesOfPokemon, index) in pokemonData.types"
          :key="`type${index}`"
        >
          {{ typesOfPokemon.type.name }}
        </span>
      </p>
      <p>{{ pokemonDescription[0].flavor_text }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonCard",
  props: {
    pokemonName: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      pokemonData: null,
      pokemonDescription: null
    };
  },
  async created() {
    if (this.pokemonName) {
      await this.getDataSpecificPokemon(this.pokemonName);
      await this.getPokemonDescription(this.pokemonData);
    }
  },
  methods: {
    async getDataSpecificPokemon(name) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(res => {
          this.pokemonData = res.data;
        });
    },
    async getPokemonDescription(pokemonData) {
      await axios.get(`${pokemonData.species.url}`).then(res => {
        this.pokemonDescription = res.data.flavor_text_entries.filter(function(
          element
        ) {
          return element.language.name === "en";
        });
      });
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
}
.text-left {
  text-align: left;
}
</style>
