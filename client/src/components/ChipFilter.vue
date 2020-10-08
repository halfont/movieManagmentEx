<template>
  <div class="chipContainer">
    <div v-for="(filterName, index) in Object.keys(filterList)" :key="index">
      <span class="chip" @click.prevent="chipClick(filterName)">
        <div class="chipIcon">
          <v-icon v-if="isMarked(filterName)"
            >mdi-checkbox-marked-circle
          </v-icon>
        </div>
        <div class="chipText">{{ filterName }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "ChipFilter",
  data: () => ({
    chipselectedFilters: [],
  }),
  props: {
    filterList: {},
  },
  mounted: function () {
    this.chipselectedFilters = this.timeline_filters;
  },
  methods: {
    chipClick(filterName) {
      store.dispatch("timeline/filterBy", this.filterList[filterName]);
    },
    isMarked: function (filterName) {
      return this.currentFilters.indexOf(this.filterList[filterName]) !== -1;
    },
  },
  computed: {
    ...mapGetters({ timeline_filters: "timeline/state_filters" }),
    currentFilters: function () {
      return this.timeline_filters;
    }
  },
};
</script>

<style scoped>
.chipContainer {
  display: flex;
  justify-items: baseline;
  margin: 10px 0 10px;
}
.chip {
  display: flex;
  justify-content: space-between;
  padding: 5px 0 0 10px;
  margin-right: 5px;
  width: fit-content;
  border-color: teal;
  border: solid 1px;
  color: teal;
  cursor: pointer;
}
.chipIcon {
  width: fit-content;
}
.chipText {
  width: fit-content;
  padding: 4px 5px;
  font-weight: bold;
  white-space: nowrap;
}
i.v-icon.v-icon {
  color: teal;
}
</style>
