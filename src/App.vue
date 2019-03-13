<template>
  <div class="row">
    <div class="col s8 offset-s2">
      <Header />
      <Map />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Map from "./components/Map";
import Footer from "./components/Footer";

export default {
  name: 'MainPage',
  components: {
    Header,
    Map,
    Footer
  },
};
</script>

<style></style>
