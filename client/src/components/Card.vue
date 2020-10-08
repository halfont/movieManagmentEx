<template>
  <div>
    <v-card width="100%" outlined>
      <div class="container">
        <div class="left">
          <div>
            <v-avatar size="48px">
              <div v-if="cardData.product === 'bpjr'" class="jr">jr</div>
              <img alt="Avatar" :src="getPic(cardData)" />
            </v-avatar>
          </div>
          <div class="titleSection">
            <h4>{{ cardData.topic_data.name }}</h4>
            <sub class="subTitle">{{ cardData.hDate }}</sub>
          </div>
        </div>
        <div class="right">
          <div class="score">
            <p v-if="hasScore(cardData.resource_type)" class="themecolor">
              Score <b>{{ cardData.score }}/{{ cardData.possible_score }} </b>
            </p>
          </div>
          <div class="work">
            <a v-if="hasZoom(cardData.resource_type)"
              ><b class="themecolor" @click="navigate(cardData.id)">
                <v-icon color="teal" class="eyeIcon" small>mdi-eye</v-icon>View
                work
              </b></a
            >
          </div>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="dialogToggle" width="700px">
      <v-card :style="cardStyleObject">
        <v-icon
          @click="dialogToggle = false"
          class="dailogClose float-right"
          color="lightgray"
          x-large
          >mdi-close-circle-outline</v-icon
        >
        <div class="dailogBody">
          <div class="Avatar">
            <v-avatar size="108px">
              <img alt="img" :src="getPic(cardData)" />
            </v-avatar>
          </div>
          <div class="cardTitle">{{ cardData.topic_data.name }}</div>
          <div class="date">{{ cardData.hDate }}</div>
          <div class="comment">{{ cardData.comment }}</div>
          <div class="score">
            <p v-if="cardData.possible_score != ''" class="themecolor">
              Score <b>{{ cardData.score }}/{{ cardData.possible_score }} </b>
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Card",
  data: () => ({
    dialogToggle: false,
    cardStyleObject: {
      "border-radius": "10px",
    },
    zoomEnabled: [
      "quiz",
      "make_a_movie",
      "word_play",
      "draw_about_it",
      "easy_quiz",
      "challenge",
      "make_a_Map",
    ],
    scoreEnabled: ["quiz", "easy_quiz", "challenge"],
  }),
  props: {
    cardData: {},
    dialogZoom: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.dialogZoom && (this.dialogToggle = true);
  },
  methods: {
    hasZoom(type) {
      return !!this.zoomEnabled.filter((a) => a === type).length;
    },
    hasScore(type) {
      return !!this.scoreEnabled.filter((a) => a === type).length;
    },
    getPic(cardData) {
      return cardData.topic_data.icon_path;
    },
    triggerModal() {
      this.dialogZoom && (this.dialogToggle = true);
    },
    navigate(id) {
      const newPath = `/${id}`;
      const curId = this.$router.currentRoute.params.itemId;
      curId !== id && this.$router.push({ path: newPath });
      this.triggerModal();
    },
    $beforeRouteLeave(to, from, next) {
      this.dialogToggle = false;
      this.dialogZoom = false;
      next();
    },
  },
  watch: {
    $route(to, from) {
      const curId = this.$router.currentRoute.params.itemId;
      if (from.params.itemId !== curId) {
        this.triggerModal();
      }
    },
  },
};
</script>

<style scoped>
.jr {
  position: absolute;
  margin-left: 20px;
  padding-top: 25px;
  font-size: 15px;
  font-weight: 1000;
}
.container {
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  height: 90px;
}
.container > .right {
  height: 20px;
  margin: 20px 30px 20px;
  width: 220px;
  display: flex;
  justify-content: space-between;
}
.container > .left {
  margin: 10px 0 20px 0;
  width: 700px;
  display: flex;
  justify-content: left;
}
.eyeIcon {
  margin-right: 3px;
}
.titleSection {
  margin-left: 10px;
  display: block;
}
.subTitle {
  color: gray;
}
.score {
  justify-self: start;
}
.work {
  justify-self: end;
}
.dailogClose {
  margin: 20px;
}
.dailogBody {
  padding-left: 30px;
  height: 500px;
}
.dailogBody > .Avatar {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100px;
}
.dailogBody > .cardTitle {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
  height: 40px;
}
.dailogBody > .date {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: gray;
  margin-top: 20px;
  height: 20px;
}
.dailogBody > .comment {
  display: flex;
  justify-self: start;
  margin-top: 10px;
  padding-top: 30px;
  height: 40px;
  font-size: 30px;
}
.dailogBody > .score {
  display: flex;
  justify-self: start;
  margin-top: 10px;
  padding-top: 130px;
  height: 40px;
}
</style>
