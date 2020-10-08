<template>
  <div>
    <div v-for="(month, index) in Object.keys(timeline)" :key="index">
      <div v-if="index && timeline[month].length != 0" class="verticalLine"></div>
      <div v-if="timeline[month].length != 0" class="monthContainer">
        <div class="month">{{ month }}</div>
      </div>
      <div v-for="item in timeline[month]" :key="item.id">
        <div class="verticalLine"></div>
        <Card :dialogZoom="triggerZoom(item.id)" :cardData="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Card from "@/components/Card.vue";

export default {
  name: "TimelineGrid",
  data: () => ({
    triggerModal: Boolean,
  }),
  props: {
    timeline: Object,
    zoom: String,
  },
  components: {
    Card,
  },
  methods: {
    triggerZoom(id) {
      return this.zoom === id;
    },
  },
};
</script>

<style scoped>
.verticalLine {
  width: 30px;
  height: 10px;
  border-right: thin solid grey;
}
.monthContainer {
  width: 100px;
}
.month {
  background-color: lemonchiffon;
  text-align: center;
  height: 30px;
  padding-top: 3px;
  border-radius: 10px;
  font-weight: 400;
}
</style>
