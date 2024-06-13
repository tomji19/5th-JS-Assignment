document.getElementById('searchButton').addEventListener('click', function () {
  searchWeather();
});

document.getElementById('cityInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchWeather();
  }
});

function searchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeatherData(city);
  }
}

function fetchWeatherData(city) {
  const apiKey = '9000e426f1f3b7047518de1cd6fb349f';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the data for debugging
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert(error.message);
    });
}

function displayWeatherData(data) {
  const weatherContainer = document.getElementById('weatherForecast');
  weatherContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const weather = data.list[i * 8]; // Get weather data at 24-hour intervals
    const date = new Date(weather.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-US');
    const temp = weather.main.temp.toFixed(1);
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;
    const weatherDescription = weather.weather[0].description;

    const weatherColumn = document.createElement('div');
    weatherColumn.classList.add('col-md-3', 'weather-column', 'text-white', 'py-3', 'mx-1');

    weatherColumn.innerHTML = `
      <div class="day-header d-flex justify-content-between">
        <span>${dayName}</span>
        <span>${dateString}</span>
      </div>
      <div class="country my-3">${data.city.name}</div>
      <div class="temperature mb-3" style="font-size: 4rem;">${temp}°C</div>
      <div class="weather-details">
        <span><i class="fas fa-wind"></i> Wind: ${wind} km/h</span><br>
        <span><i class="fas fa-tint"></i> Humidity: ${humidity}%</span><br>
        <span><i class="fas fa-cloud"></i> ${weatherDescription}</span>
      </div>
    `;

    weatherContainer.appendChild(weatherColumn);
  }
}
