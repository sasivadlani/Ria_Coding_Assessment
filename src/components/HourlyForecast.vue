<template>
  <section class="hourly">
    <h2>Next Hours - {{ city }}</h2>
    <div class="hourly-cards">
      <div
        class="hour"
        v-for="(hour, i) in hourlyData"
        :key="i"
      >
        <div>{{ formatHour(hour.dt_txt) }}</div>
        <div>{{ Math.round(hour.main.temp) }}°</div>
        <div>{{ Math.round((hour.pop || 0) * 100) }}%</div>
        <img
          :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
          :alt="hour.weather[0].description"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HourlyForecast',
  props: {
    hourlyData: {
      type: Array,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  methods: {
    formatHour(datetime) {
      const date = new Date(datetime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.hourly-cards {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 10px 0;
}
.hour {
  flex: 0 0 auto;
  background: #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  min-width: 80px;
  font-size: 13px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.hour img {
  width: 50px;
  height: 50px;
}

</style>
