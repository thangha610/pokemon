<template>
  <div class="home select-pokemon-page container">
    <img src="../assets/logo-pixel.gif" alt="" />
    <div class="select-pokemon-content">
      <pokemon-list
        :pokemon-list="statePokemonList"
        :favorites="stateFavoriteList"
        @deleteFavorite="deleteFavorite"
        @addFavorite="addFavorite"
      />
      <favoriteList
        :pokemon-list="statePokemonList"
        :favorites="stateFavoriteList"
        @addFavorite="addFavorite"
        @eraseFavoritePokemonList="removeFavorite"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapActions, mapState } from "vuex";
import PokemonList from "../components/PokemonList.vue";
import FavoriteList from "../components/FavoriteList.vue";

export default {
  name: "home",
  components: {
    PokemonList,
    FavoriteList
  },
  data() {
    return {
      pokemonData: {
        type: Object,
        default: {}
      }
    };
  },
  computed: {
    ...mapState(["statePokemonList", "stateFavoriteList"])
  },
  async created() {
    await this.fetchPokemonData();
    this.setPokemonData(this.pokemonData);
  },
  methods: {
    async fetchPokemonData() {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(res => {
          this.pokemonData = res.data.results;
        });
    },
    ...mapActions([
      "setPokemonData",
      "setFavoriteList",
      "addFavorite",
      "deleteFavorite",
      "removeFavorite"
    ])
  }
};
</script>

<style scoped>
.select-pokemon-page {
  text-align: center;
}
.select-pokemon-content {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
</style>
