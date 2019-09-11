<template>
  <div class="pokemon-list">
    <h2>Choose your Pokémon</h2>
    <table class="nes-table is-bordered is-centered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Pokemon's name</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pokemon, index) in pokemonList"
          :key="pokemon.url"
          class="pokemon-list-item"
        >
          <td>{{ index + 1 + ". " }}</td>
          <td>
            <i
              v-if="favorites.includes(pokemon.name)"
              class="nes-icon is-small star"
            >
            </i>
            <i v-else class="nes-icon is-small star is-empty"></i>
            &nbsp;{{ pokemon.name }}
          </td>
          <td>
            <img
              :key="pokemon.url"
              :src="
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                  1}.png`
              "
              alt="Pokemon`"
            />
          </td>
          <td>
            <a
              v-show="!favorites.includes(pokemon.name)"
              class="nes-btn"
              :class="{ 'is-disabled': favoriteListLength === 10 }"
              @click="setFavorites(pokemon.name)"
              >Pick me!</a
            >
            <button
              v-show="favorites.includes(pokemon.name)"
              class="nes-btn is-error"
              @click="setFavorites(pokemon.name)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "PokemonList",
  props: {
    pokemonList: {
      type: Array,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    }
  },
  computed: {
    favoriteListLength() {
      return this.favorites.length;
    }
  },
  methods: {
    setFavorites(name) {
      if (this.favorites.includes(name)) {
        const indexInArray = this.favorites.indexOf(name);
        this.$emit("deleteFavorite", indexInArray);
        return;
      }
      if (this.favoriteListLength < 10) {
        this.$emit("addFavorite", name);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pokemon-list {
  text-transform: capitalize;
}

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 24px 0;
  list-style: none;
  > li {
    display: inline !important; // Remove list-style and block-level defaults
  }
}

.page {
  display: inline !important;
}
</style>
