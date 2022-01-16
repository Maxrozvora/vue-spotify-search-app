<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setAuthHeader } from "@/utils/functions";
export default {
  name: "App",
  methods: {
    ...mapActions(["initApp", "logout"]),
  },
  created() {
    this.initApp();
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
