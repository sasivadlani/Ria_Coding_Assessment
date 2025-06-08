<template>
  <div class="last-updated" v-if="timestamp">
    Last updated on {{ timestamp }}
  </div>
</template>

<script>
export default {
  name: 'LastUpdated',
  props: {
    timestamp: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.last-updated {
  text-align: center;
  background: #1976d2;
  color: white;
  padding: 8px;
  font-size: 0.9rem;
  position: sticky;
  bottom: 0;
}
</style>
