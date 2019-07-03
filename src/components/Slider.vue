<template>
  <div class="sliderWrapper">
    <vue-slider
      class="slider"
      ref="slider"
      v-model="values"
      :duration="slideDuration"
      :data="data"
      :marks="true"
      :enable-cross="enableCross"
      @drag-start="oldValues = values"
      @drag-end="updateEnd"
    ></vue-slider>
    <div class="options">
      <label>
        <input class="uk-checkbox" type="checkbox" v-on:change="toggleDragTogether" />
        Link dates
      </label>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
export default {
  name: "Slider",
  components: {
    VueSlider,
  },
  data: () => {
    return {
      dragTogether: false,
      enableCross: false,
      slideDuration: 0.5,
      values: ["Jun 76", "Feb 77"],
      oldValues: ["Jun 76", "Feb 77"],
      monthTimestamps: [
        202428000.0,
        205020000.0,
        207698400.0,
        210376800.0,
        212968800.0,
        215647200.0,
        218239200.0,
        220917600.0,
        223596000.0,
        226015200.0
      ],
      data: [
        "Jun 76",
        "Jul 76",
        "Aug 76",
        "Sep 76",
        "Oct 76",
        "Nov 76",
        "Dec 76",
        "Jan 77",
        "Feb 77"
      ]
    };
  },
  computed: {
    startTimeStamp: function() {
      return this.monthTimestamps[this.data.indexOf(this.values[0])];
    },
    endTimeStamp: function() {
      return this.monthTimestamps[this.data.indexOf(this.values[1]) + 1];
    }
  },
  methods: {
    updateEnd() {
      this.$emit("updateEnd", {start: this.startTimeStamp, end: this.endTimeStamp});
      // let filteredRecords = [];
      // filteredRecords = this.deaths.filter(
      //   i => i.timestamp >= start && i.timestamp <= end
      // );
      // this.deaths = filteredRecords;
      // console.log("aaaaa",start, end, this.deaths);

      if (this.dragTogether) {
        let oldDuration = this.duration;
        this.duration = 0.1;
        let oldStart = this.oldValues[0];
        let oldEnd = this.oldValues[1];
        let distL =
          this.data.indexOf(this.values[0]) - this.data.indexOf(oldStart);
        let distR =
          this.data.indexOf(oldEnd) - this.data.indexOf(this.values[1]);
        if (distL !== 0) {
          let curEnd = this.data.indexOf(this.values[1]);
          let newEnd = curEnd + distL;
          if (newEnd > this.data.length - 1) {
            this.values = this.oldValues;
          } else {
            this.values = [this.values[0], this.data[newEnd]];
          }
        } else if (distR !== 0) {
          let curBegin = this.data.indexOf(this.values[0]);
          let newBegin = curBegin - distR;
          if (newBegin < 0) {
            this.values = this.oldValues;
          } else {
            this.values = [this.data[newBegin], this.values[1]];
          }
        }
        this.duration = oldDuration;
      }
    },
    toggleDragTogether() {
      this.dragTogether = !this.dragTogether;
    }
  }
};
</script>

<style scoped lang="scss">
.sliderWrapper {
  margin-top: 30px;
  padding: 30px;

  .options {
    margin-top: 20px;
  }
}
</style>
