<template>
  <section class="antialiased bg-gray-900 text-gray-600 px-4 min-h-screen">
    <h1
      class="font-bold mb-4 md:text-[40px] py-20 sm:text-4xl text-3xl text-center text-dark"
    >
      Music search
    </h1>
    <div>
      <!-- Table -->
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <div class="w-full">
            <input
              v-model="searchTerm"
              @input="performSearch"
              type="text"
              placeholder="Type to search"
              class="px-4 py-2 bg-gray-50 w-full"
            />
          </div>
        </header>
        <div class="p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full" v-if="results.length">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-2 whitespace-nowrap" colspan="1"></th>
                  <th class="p-2 whitespace-nowrap" colspan="3">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap" colspan="1">
                    <div class="font-semibold text-left">Info</div>
                  </th>
                </tr>
              </thead>
              <SearchType v-for="(type, i) of results" :type="type" :key="i" />
            </table>
            <div v-else>
              <p class="font-mono mt-2 text-center text-gray-600">
                {{ searchMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SearchType from "@/components/SearchType";
import { mapActions, mapGetters } from "vuex";
import debounce from "lodash.debounce";
export default {
  name: "Search",
  components: { SearchType },
  data: () => ({
    searchTerm: "",
    maxResult: 10,
    filters: ["artist", "track", "album"],
  }),
  computed: {
    ...mapGetters(["searchResults", "searchStatus"]),
    results() {
      const results = this.searchResults;
      return Object.keys(results)
        .filter((type) => results[type].items.length > 0)
        .map((type) => ({ type, items: results[type].items }));
    },
    noResults() {
      return this.searchStatus !== "SEARCHING" && this.results.length < 1;
    },
    searchMessage() {
      return this.searchTerm === ""
        ? "Type something to start searching"
        : "We can't find any tracks for you";
    },
  },
  methods: {
    ...mapActions(["search", "clearResults"]),
    performSearch: debounce(function () {
      if (this.searchTerm !== "") {
        const query = {
          searchTerm: this.searchTerm,
          type: this.filters.join(","),
        };
        this.search(query);
      } else {
        this.clearResults();
      }
    }, 200),
  },
  mounted() {
    if (this.$store.getters.searchTerm && this.searchResults) {
      this.searchTerm = this.$store.getters.searchTerm;
      this.performSearch();
    }
  },
};
</script>

<style scoped></style>
