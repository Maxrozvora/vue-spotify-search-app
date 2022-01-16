<template>
  <tbody class="text-sm divide-y divide-gray-100">
    <tr>
      <td class="p-2 whitespace-nowrap" colspan="5">
        <div class="flex items-center">
          <div class="font-medium text-gray-800 text-center">
            {{ type.type.toUpperCase() }}
          </div>
        </div>
      </td>
    </tr>
    <SearchItem v-for="(item, i) of getItems" :item="item" :key="i" />
  </tbody>
</template>

<script>
import SearchItem from "@/components/SearchItem";
export default {
  name: "SearchType",
  components: { SearchItem },
  props: {
    type: {
      type: Object,
    },
  },
  computed: {
    getItems() {
      return this.type.items;
    },
  },
};
</script>

<style scoped></style>
