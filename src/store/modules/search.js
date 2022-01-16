import qs from "qs";
import { APP_SEARCH_ENDPOINT } from "@/utils/variables";
import { DONE } from "@/utils/statuses";

const state = {
  results: {},
  searchStatus: DONE,
  searchTerm: "",
};

const mutations = {
  setSearchResult(state, payload) {
    state.results = JSON.parse(JSON.stringify(payload));
  },
  setSearchStatus(state, payload) {
    state.searchStatus = payload;
  },
  setSearchTerm(state, payload) {
    state.searchTerm = payload;
  },
  clearSearchResult(state) {
    state.results = {};
    state.searchTerm = "";
  },
};

const actions = {
  async search({ commit, getters }, query) {
    try {
      commit("setSearchResult", "SEARCHING");
      commit("setSearchTerm", query.searchTerm);
      const res = await this._vm.$http.get(APP_SEARCH_ENDPOINT, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          q: getters.searchTerm,
          type: query.type,
          offset: query.offset || 0,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      });
      commit("setSearchResult", res.data);
      commit("setSearchStatus", DONE);
    } catch (error) {
      commit("setSearchResult", DONE);
      console.error("SEARCH ERROR: " + error);
    }
  },
  clearResults: ({ commit }) => {
    commit("clearSearchResult");
  },
};

const getters = {
  searchResults: (state) => state.results,
  searchStatus: (state) => state.searchStatus,
  searchTerm: (state) => state.searchTerm,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
