<template>
  <div class="row">
    <div class="col s8 offset-s2">
      <Header />
      <Map />
      <pre v-if="site_data">{{site_data}}</pre>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Map from "./components/Map";
import {AxiosInstance as axios} from "axios";

export default {
  name: 'MainPage',
  components: {
    Header,
    Map
  },
  data: () => {
    return {
      site_data: null
    }
  },
  mounted: function () {
    let url = 'http://1976.webbedfeet.co.za/.netlify/functions/site_data';
    axios.get(url).then(response => {
      this.site_data = response.data
    });
  }
};
</script>

<style></style>
