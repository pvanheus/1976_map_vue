<template>
  <div>
    <Nav />
    <div class="uk-container uk-margin-top">
      <div id="headerWrapper" class="uk-grid-small uk-child-width-expand@s" uk-grid>
        <Header1 />
        <Header2 />
      </div>

      <div id="mapWrapper" class="uk-card uk-card-default uk-card-body">
        <br />
        <div class="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid>
          <div>
            <label>
              <input class="uk-checkbox" type="checkbox" v-on:change="toggleDragTogether()" />
              Link dates
            </label>
          </div>
          <div>
            <vue-slider
              class="slider"
              ref="slider"
              v-model="values"
              :duration="slideDuration"
              :data="data"
              :marks="true"
              :enable-cross="enableCross"
              @drag-start="oldValues = values"
              @drag-end="updateEnd(startTimeStamp, endTimeStamp)"
            ></vue-slider>
            <br />
          </div>
        </div>

        <Map v-bind:start-timestamp="startTimeStamp" v-bind:end-timestamp="endTimeStamp" />
      </div>
      <br />
      <Table id="tableWrapper" :data="deaths" v-if="deaths.length > 0" />
      <Footer />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Header1 from "./components/Header1";
import Header2 from "./components/Header2";
import Map from "./components/Map";
import Table from "./components/Table";
import Footer from "./components/Footer";
import VueSlider from "vue-slider-component";
import axios from "axios";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

UIkit.use(Icons);

// var firebaseConfig = {
//   apiKey: "AIzaSyAlpAPQbJvjKzTwiafvPSnOSRqixbX8uGc",
//   authDomain: "deaths-map-da845.firebaseapp.com",
//   databaseURL: "https://deaths-map-da845.firebaseio.com",
//   projectId: "deaths-map-da845",
//   storageBucket: "deaths-map-da845.appspot.com",
//   messagingSenderId: "640782590040",
//   appId: "1:640782590040:web:a4813920764e6bf2"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export default {
  name: "MainPage",
  components: {
    Nav,
    Header1,
    Header2,
    Map,
    Footer,
    VueSlider,
    Table
  },
  data: () => {
    return {
      deaths: [],
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
      this.deaths = response.data;
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
    updateEnd(start, end) {
      let filteredRecords = [];
      filteredRecords = this.deaths.filter(
        i => i.timestamp >= start && i.timestamp <= end
      );
      this.deaths = filteredRecords;
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
    }
  }
};
</script>

<style lang="scss">
@import "../node_modules/uikit/dist/css/uikit.min.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";

#headerWrapper, #tableWrapper {
  margin: 0 120px;
}

#mapWrapper {
  padding: 10px;
  margin: 30px 120px 0 120px;
}
.controls {
  background: #fff;
  padding: 50px 10px 10px 10px;
  width: 50%;
  margin: -20px 80px;
  z-index: 9999999;

  .options {
    margin-top: 10px;
  }
}

.slider {
  margin-right: 20px;
  max-width: 442px;
}
</style>
