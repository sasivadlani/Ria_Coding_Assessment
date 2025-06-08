const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getForecastByCoordinates(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather API request failed');
  }

  const data = await response.json();

  const hourly = data.list.slice(0, 8);

  const daily = [];
  const seen = new Set();
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!seen.has(date)) {
      seen.add(date);
      daily.push(item);
    }
  });

  return {
    city: data.city.name,
    hourly,
    daily
  };
}
