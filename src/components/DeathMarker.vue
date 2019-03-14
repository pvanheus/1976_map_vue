<template>
  <l-circle-marker
          v-if="latLng"
          :lat-lng="latLng"
          :radius="markerRadius"
          :color="markerColour"
          :opacity="markerOpacity"
  >
    <l-popup>
      <DeathPopupContent :death="death" />
    </l-popup>
  </l-circle-marker>
</template>

<script>
import { LCircleMarker, LPopup } from 'vue2-leaflet'
import DeathPopupContent from './DeathPopupContent'

export default {
  name: 'DeathMapMarker',
  props: {
    death: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    latLng() {
      if (this.death) {
        // eslint-disable-next-line
        return L.latLng(this.death.latitude, this.death.longitude)
      } else {
        return null
      }
    },
    markerColour() {
      return '#FF0000';
    },
    markerOpacity() {
      return this.visible ? 1.0 : 0.2;
    },
    markerRadius() {
      return this.visible ? 3 : 1;
    }
  },
  components: { DeathPopupContent, LCircleMarker, LPopup }
}
</script>

<style scoped>
</style>
