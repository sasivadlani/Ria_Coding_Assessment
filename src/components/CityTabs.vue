<template>
  <nav class="tabs">
    <button
      v-for="city in cities"
      :key="city"
      :class="{ active: city === selectedCity }"
      @click="$emit('select-city', city)"
    >
      {{ city }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'CityTabs',
  props: {
    cities: {
      type: Array,
      required: true
    },
    selectedCity: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  background: #f0f0f0;
  margin-top: 10px;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  font-weight: normal;
  color: black;
  font-size: 16px;
}
.tabs button.active {
  font-weight: bold;
  border-bottom: 3px solid red;
  background: white;
}
</style>
