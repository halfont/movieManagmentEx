<template>
  <div>
    <div class="searchInput">
      <v-autocomplete
        flat
        dense
        solo
        outlined
        v-model="model"
        :items="items"
        :search-input.sync="search"
        append-icon="mdi-magnify"
        label="Search Timeline"
      ></v-autocomplete>
    </div>
    <p>Filter by:</p>
    <ChipFilter :filterList="filterList" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChipFilter from "@/components/ChipFilter.vue";
import store from "../store";


export default {
  name: "Nav",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    model: null,
    search: null,
    filterList: {
      Movie: "movie",
      Quiz: "quiz",
      "Easy Quiz": "easy_quiz",
      Challenge: "challenge",
      "Make a Map": "make_a_map",
      "Make a Movie": "make_a_movie",
      Wordplay: "word_play",
      "Related reading": "related_reading",
      "Draw about it": "draw_about_it",
    },
    selectedFilters: [],
    chipselectedFilters: [],
  }),
  props: {
    cardData: {},
  },
  components: {
    ChipFilter,
  },
  mounted: function () {
    Object.keys(this.cardData).map((month) =>
      this.entries.push(this.cardData[month])
    );
    //  remove a class causing rotation of icon in search input
    const transformClass = document.querySelector(".v-input__icon--append");
    transformClass.classList.remove("v-input__icon--append");
  },
  watch: {
    search(val) {
      console.log("search", val);
      store.dispatch("timeline/filterBy", this.filterList[val]);
    },
  },
  computed: {
    ...mapGetters({ timeline_filters: "timeline/filters" }),
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map((key) => ({
        key,
        value: this.model[key] || "n/a",
      }));
    },
    items() {
      // console.log("computed items ", this.entries);
      // const flatArr = [];
      // // this.entries.map((entry) => entry.map((card) => flatArr.push(card.resource_type)));
      // Object.keys(this.filterList).map(
      //   filterName => flatArr.push(this.filterList[filterName])
      //   );
      return Object.keys(this.filterList);
    },
  },
};
</script>

<style scoped>
.searchInput {
  margin-top: 15px;
  margin-bottom: 0.5vh;
  width: 50%;
  height: 50px;
}
</style>
