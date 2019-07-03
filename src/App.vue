<template>
  <div>
    <Nav />
    <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
      <Map v-bind:start-timestamp="startTimeStamp" v-bind:end-timestamp="endTimeStamp" />
      <div class="uk-width-1-4">
        <Slider @updateEnd="updateEnd" />
        <Header1 />
      </div>
    </div>
    <div id="row2Wrapper" class="uk-grid-small uk-child-width-expand@s" uk-grid>
      <Table :data="deaths" v-if="deaths.length > 0" />
      <div>
        <Header2 />
        <br />
        <div class="uk-child-width-expand@s" uk-grid>
          <div class="uk-grid-item-match">
            <div class="uk-light uk-background-primary uk-padding">
              <h4>Want to get involved?</h4>
              <button class="uk-button uk-button-default">Call to action text</button>
            </div>
          </div>
          <div>
            <div class="uk-light uk-background-primary uk-padding">
              <h3>Want to get involved?</h3>
              <button class="uk-button uk-button-default">Call to action text</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Slider from "./components/Slider";
import Header1 from "./components/Header1";
import Header2 from "./components/Header2";
import Map from "./components/Map";
import Table from "./components/Table";
import Footer from "./components/Footer";
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
    Slider,
    Header1,
    Header2,
    Map,
    Footer,
    Table
  },
  data: () => {
    return {
      deaths: [],
      startTimeStamp: 202428000.0,
      endTimeStamp: 226015200.0
    };
  },
  mounted() {
    let data_url =
      "https://raw.githubusercontent.com/pvanheus/1976/master/1976_cape_deaths.json";
    axios.get(data_url).then(response => {
      this.deaths = response.data;
    });
  },
  methods: {
    updateEnd({ start, end }) {
      this.startTimeStamp = start;
      this.endTimeStamp = end;
    }
  }
};
</script>

<style lang="scss">
@import "../node_modules/uikit/dist/css/uikit.min.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";

#row2Wrapper {
  margin: auto 20px;

  > div {
    margin: 20px;
  }
}
</style>
