<template>
  <div class="top">
    <h1>Timeline</h1>
    <Nav :cardData="timeline" />
    <TimelineGrid :zoom="getId()" :timeline="timeline" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Nav from "@/components/Nav.vue";
import TimelineGrid from "@/components/TimelineGrid.vue";
import store from "../store";

const axios = require("axios");

export default {
  name: "Activities",
  props: {
    itemId: String,
  },
  components: {
    TimelineGrid,
    Nav,
  },
  methods: {
    populateV1() {
      return axios.get("v1");
    },
    getId() {
      return this.itemId;
    },
  },
  mounted() {
    this.populateV1().then((v) => {
      store.dispatch("timeline/initTimelineV1", v.data);
    });
  },
  computed: {
    ...mapGetters({
      timeline: "timeline/full",
    }),
  },
};
</script>

<style >
.top {
  margin-top: 5vh;
  margin-left: 25vw;
  margin-right: 25vw;
}
</style>
