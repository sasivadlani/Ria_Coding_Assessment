<template>
  <section class="daily">
    <h2>Next 5 Days - {{ city }}</h2>
    <div class="daily-cards">
      <div class="day" v-for="(day, i) in dailyData.slice(0, 5)" :key="i">
        <img
          :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
          :alt="day.weather[0].description"
        />
        <div class="info">
          <div><strong>{{ formatDayDate(day.dt_txt) }}</strong></div>
          <div>{{ day.weather[0].description }}</div>
        </div>
        <div class="temps">
          <strong>{{ Math.round(day.main.temp_max) }}°</strong>
          <span>/ {{ Math.round(day.main.temp_min) }}°</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DailyForecast',
  props: {
    dailyData: {
      type: Array,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDayDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.daily-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.day {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  font-size: 14px;
}
.day img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
