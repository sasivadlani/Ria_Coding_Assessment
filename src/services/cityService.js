import Papa from 'papaparse';

let cachedCityList = [];

export async function loadCityList() {
  if (cachedCityList.length) return cachedCityList;

  const response = await fetch('/cities_20000.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        cachedCityList = results.data;
        resolve(cachedCityList);
      },
      error: (err) => reject(err)
    });
  });
}

export function searchCity(cityList, query) {
  if (!query) return null;

  const cleanQuery = query.trim().toLowerCase();
  return cityList.find(
    c => c.city_name.toLowerCase() === cleanQuery
  ) || null;
}

