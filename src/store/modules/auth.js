import { ERROR, LOADING, LOGGED } from "@/utils/statuses";
import {
  getExpirationTime,
  getTokenParams,
  isTokenExpired,
  removeAuthHeader,
  setAuthHeader,
} from "@/utils/functions";
import {
  APP_AUTHORIZE_URL,
  APP_CLIENT_ID,
  APP_REDIRECT_URI,
} from "@/utils/variables";
import router from "@/router";

const state = {
  token: localStorage.getItem("access-token") || "",
  tokenExpirationTime: localStorage.getItem("tokenExpirationTime") || "",
  status: "",
};
const mutations = {
  authRequest(state) {
    state.status = LOADING;
  },
  onAuthSuccess(state, payload) {
    state.status = LOGGED;
    state.token = payload.token;
    state.tokenExpirationTime = payload.expirationTime;
    localStorage.setItem("access-token", payload.token);
    localStorage.setItem("tokenExpirationTime", payload.expirationTime);
    setAuthHeader(this._vm.$http, payload.token);
  },
  onAuthError(state) {
    state.status = ERROR;
  },
  logout(state) {
    debugger;
    state.status = "";
    state.token = "";
    state.tokenExpirationTime = "";
    localStorage.removeItem("access-token");
    localStorage.removeItem("tokenExpirationTime");
    removeAuthHeader(this._vm.$http);
  },
};
const actions = {
  initApp() {
    console.log("initApp");
    this._vm.$http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.error("Token expired!");
          this.logout();
          router.push({ name: "login" });
          throw error;
        } else {
          return Promise.reject(error);
        }
      }
    );
  },
  requestAuth({ commit }) {
    return new Promise((resolve) => {
      commit("authRequest");
      window.location = `${APP_AUTHORIZE_URL}?client_id=${APP_CLIENT_ID}&redirect_uri=${APP_REDIRECT_URI}&response_type=token`;
      resolve();
    });
  },
  onSuccessAuth({ commit }, hash) {
    return new Promise((resolve) => {
      const { access_token: token, expires_in } = getTokenParams(hash);
      const tokenPayload = {
        token,
        expirationTime: getExpirationTime(expires_in),
      };
      commit("onAuthSuccess", tokenPayload);
      resolve();
    });
  },
  onFailAuth({ commit }) {
    commit("onAuthError");
  },
  logout: ({ commit }) => {
    commit("logout");
  },
};
const getters = {
  token: (state) => state.token,
  isAuthenticated: (state) =>
    !!state.token && !isTokenExpired(state.tokenExpirationTime),
  authStatus: (state) => state.status,
  hasTokenExpired: (state) =>
    !state.tokenExpirationTime || isTokenExpired(state.tokenExpirationTime),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
