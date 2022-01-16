<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setAuthHeader } from "@/utils/functions";
import router from "@/router";
export default {
  name: "App",
  methods: {
    ...mapActions(["initApp", "logout"]),
  },
  created() {
    this.$http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("Token expired!");
          this.logout();
          router.push({ name: "login" });
          throw error;
        } else {
          return Promise.reject(error);
        }
      }
    );
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      setAuthHeader(this.$http, this.$store.getters.token);
    } else {
      this.logout();
    }
  },
};
</script>
