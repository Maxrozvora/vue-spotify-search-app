<template>
  <tr>
    <td class="p-2" colspan="1">
      <div class="flex items-center">
        <div class="flex-shrink-0 mr-2 sm:mr-3">
          <img :src="getImageSrc" width="80" height="80" :alt="item.name" />
        </div>
      </div>
    </td>
    <td class="p-2" colspan="3">
      <div class="font-medium text-gray-800">{{ item.name }}</div>
    </td>
    <td class="p-2" colspan="1">
      <div class="text-left font-medium text-green-500">
        <div class="font-medium text-gray-800">{{ getSubtitle }}</div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "SearchItem",
  props: ["item"],
  computed: {
    getImageSrc() {
      return this.item.type === "track"
        ? this.item.album?.images[0]?.url
        : this.item.images[0]?.url;
    },
    getSubtitle() {
      if (this.item.type === "album") {
        return this.item.artists[0]?.name;
      }
      if (this.item.type === "track") {
        return this.item.artists.map((artist) => artist.name).join(", ");
      }
      if (this.item.type === "artist") {
        return `${this.item.followers?.total} followers`;
      }
      return "";
    },
  },
};
</script>

<style scoped></style>
