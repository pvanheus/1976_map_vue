<template>
  <div v-if="death">
    <span><b>{{ this.personWithAge }}</b></span><br />
    <span class="deathdate">{{ this.deathDate }}</span><br />
    <span class="location">{{ this.death.place }}</span><br />
    <span class="deathdetail">{{ this.deathDetail }}</span><br />
  </div>
</template>

<script>
export default {
  name: 'DeathPopupContent',
  props: {
    death: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      personWithAge: `${this.death.person}. Age: ${this.death.age}`
    }
  },
  computed: {
    deathDate() {
      let date = /\d+\/\d+\/\d+/.exec(this.death.date_of_death);
      return date ? this.death.date_of_death : 'Unknown';
    },
    deathDetail() {
      if (this.death.detail === 'Unknown') {
        return '';
      } else {
        return this.death.detail;
      }
    }
  }
}
</script>

<style scoped></style>
