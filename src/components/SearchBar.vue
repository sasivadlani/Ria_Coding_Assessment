<template>
  <div class="search-container">
    <input
      v-model="query"
      @keyup.enter="onSearch"
      type="text"
      placeholder="Search city..."
    />
    <button @click="onSearch" :disabled="disabled">Search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: ''
    };
  },
  methods: {
    onSearch() {
      if (this.query.trim()) {
        this.$emit('search', this.query.trim());
        this.query = '';
      }
    }
  }
};
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 6px;
  margin: 12px 0;
}

.search-container input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container button {
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

