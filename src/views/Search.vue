<template>
  <section class="antialiased bg-gray-900 text-gray-600 h-screen px-4">
    <div class="flex flex-col justify-center h-full">
      <!-- Table -->
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100">
          <div class="w-full">
            <input
              v-model="searchText"
              @input="performSearch"
              type="text"
              placeholder="Type for search"
              class="px-4 py-2 bg-gray-50 w-full"
            />
          </div>
        </header>
        <div class="p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead
                class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
              >
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Email</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Spent</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Country</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <SearchItem />
                {{
                  results
                }}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SearchItem from "@/components/SearchItem";
import { mapActions, mapGetters } from "vuex";
import debounce from "lodash.debounce";
export default {
  name: "Search",
  components: { SearchItem },
  data: () => ({
    searchText: "",
    maxResult: 10,
    filters: ["artist", "track", "album"],
  }),
  computed: {
    ...mapGetters(["searchResults", "searchStatus"]),
    results() {
      const results = this.searchResults;
      return Object.keys(results)
        .filter((type) => results[type].items.length > 0)
        .map((type) => results[type].items);
    },
    noResults() {
      return this.searchStatus !== "SEARCHING" && this.results.length < 1;
    },
    searchMessage() {
      return this.searchTerm === ""
        ? "Type something to start searching"
        : "😰 Oops! No results found...";
    },
  },
  methods: {
    ...mapActions(["search", "clearResults"]),
    performSearch: debounce(function () {
      if (this.searchText !== "") {
        const query = {
          searchText: this.searchText,
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
