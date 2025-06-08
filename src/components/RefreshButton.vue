<template>
  <div class="refresh-container">
    <button @click="$emit('refresh')" :disabled="disabled">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        viewBox="0 0 24 24"
        width="18"
        fill="white"
        style="margin-right: 6px;"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M17.65 6.35A7.95 7.95 0 0012 4a8 8 0 000 16 8 8 0 007.75-6h-2.08a6 6 0 11-1.41-6.59l-2.34 2.34H20V4l-2.35 2.35z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'RefreshButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.refresh-container {
  text-align: center;
  display: flex;
  justify-content: flex-end;
  margin: 8px 0;
}

.refresh-container button {
  background-color: #1976d2;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.refresh-container button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
