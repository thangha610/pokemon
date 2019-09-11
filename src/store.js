import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "pokedex"
    })
  ],
  state: {
    statePokemonList: [],
    stateFavoriteList: []
  },
  mutations: {
    setPokemonData(state, list) {
      state.statePokemonList = list;
    },
    setFavoritePokemonList(state, list) {
      state.stateFavoriteList = list;
    },
    addFavorite(state, name) {
      state.stateFavoriteList.push(name);
    },
    deleteFavorite(state, item) {
      state.stateFavoriteList.splice(item, 1);
    },
    removeFavorite(state) {
      state.stateFavoriteList = [];
    }
  },
  actions: {
    setPokemonData(context, payload) {
      context.commit("setPokemonData", payload);
    },
    setFavoriteList(context, payload) {
      context.commit("setFavoritePokemonList", payload);
    },
    addFavorite(context, payload) {
      context.commit("addFavorite", payload);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    removeFavorite(context) {
      context.commit("removeFavorite");
    }
  }
});
