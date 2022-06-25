<template>
  <l-marker
    v-if="latLngD"
    :lat-lng="latLngD"
    :icon="icon"
    :radius="markerRadius"
    :color="markerColour"
    :opacity="markerOpacity"
  >
    <l-popup>
      <DeathPopupContent :death="death" />
    </l-popup>
  </l-marker>
</template>

<script>
import { latLng, icon } from 'leaflet';
import { LMarker, LIcon, LPopup } from "vue2-leaflet";
import DeathPopupContent from "./DeathPopupContent";

import { Icon } from 'leaflet';

let circle_svg = '<?xml version="1.0" encoding="UTF-8"?> <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1"> <circle cx="8" cy="8" r="4" fill="none" stroke="#ff0000" stroke-width="3" /> </svg>';
let iconUrl = 'data:image/svg+xml;base64,' + btoa(circle_svg);

export default {
  name: "DeathMapMarker",
  props: {
    death: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      icon: icon({
        iconUrl: iconUrl,
        iconSize: [16, 16],
      }),
    }
  },
  computed: {
    latLngD() {
      if (this.death) {
        return latLng(this.death.latitude, this.death.longitude)
      } else {
        return null;
      }
    },
    markerColour() {
      return "#FF0000";
    },
    markerOpacity() {
      return this.visible ? 1.0 : 0.2;
    },
    markerRadius() {
      return this.visible ? 3 : 1;
    },
  },
  components: { DeathPopupContent, LPopup, LMarker, LIcon },
};
</script>

<style scoped></style>
