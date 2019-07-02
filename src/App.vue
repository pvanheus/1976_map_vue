<template>
  <div class="uk-inline">
    <div class="uk-overlay uk-light uk-position-bottom">
      <Nav/>
      <Header/>
      <Map
        v-bind:start-timestamp="startTimeStamp"
        v-bind:end-timestamp="endTimeStamp"
      />
      <div class="container">
        <div class="row">
          <div class="col s2">
            <div class="switch valign-wrapper">
              <label>
                Link dates
                <input v-on:change="toggleDragTogether()" type="checkbox">
                <span class="lever valign-wrapper"></span>
              </label>
            </div>
          </div>
          <div class="col s9">
            <vue-slider
              ref="slider"
              v-model="values"
              :duration="slideDuration"
              :data="data"
              :marks="true"
              :enable-cross="enableCross"
              @drag-start="oldValues = values"
              @drag-end="updateEnd(startTimeStamp, endTimeStamp)"
            ></vue-slider>
          </div>
        </div>
        <Table
          :data="records"
          v-if="records.length > 0"
        />
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import Footer from "./components/Footer";
import VueSlider from "vue-slider-component";
import axios from "axios";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

export default {
  name: "MainPage",
  components: {
    Nav,
    Header,
    Map,
    Footer,
    VueSlider,
    Table
  },
  data: () => {
    return {
      records: [],
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
  mounted() {
    let data_url =
      "https://raw.githubusercontent.com/pvanheus/1976/master/1976_cape_deaths.json";
    axios.get(data_url).then(response => {
      this.records = response.data;
    });
  },
  methods: {
    saveValues: function() {
      this.oldValues = this.values;
    },
    toggleDragTogether: function() {
      this.dragTogether = !this.dragTogether;
      // this.enableCross = !this.enableCross;
    },
    updateEnd: function(start, end) {
      let filteredRecords = [];
      filteredRecords = this.records.filter(i => i.timestamp >= start && i.timestamp <= end);
      this.records = filteredRecords;
      // console.log("aaaaa",start, end, this.records);
      // Table records not updating but this.records log is updated

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
    }
  }
};
</script>

<style lang="scss">
@import "../node_modules/uikit/dist/css/uikit.min.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
</style>
