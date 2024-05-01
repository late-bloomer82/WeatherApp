const unitSpans = document.querySelectorAll('.units');
const windUnitSpan = document.getElementById('wind-unit');
const inputElement = document.getElementById('input');
const searchButton = document.getElementById('searchButton');
const htmlBody = document.body;
const dateP = document.getElementById('date');
const locationSpan = document.getElementById('locationSpan');
const currentWeatherP = document.getElementById('current-weather');
const todayTempParagraph = document.getElementById('today-temp');
const weatherImg = document.getElementById('weather-img');
const feelsLikeParagraph = document.getElementById('feels-like-p');
const humidityParagraph = document.getElementById('humidity-p');
const windParagraph = document.getElementById('wind-p');
const day1DateHeading = document.querySelector('#forecast-card-day1 h4');
const day1WeatherHeading = document.querySelector('#forecast-card-day1 h3');
const day1WeatherImg = document.querySelector('#forecast-card-day1 img');
const day1CurrentTempParagraph = document.querySelector(
  '#forecast-card-day1 #current-temp',
);
const day1LowParagraph = document.querySelector('#forecast-card-day1 #low');
const day1HighParagraph = document.querySelector('#forecast-card-day1 #high');

const day2DateHeading = document.querySelector('#forecast-card-day2 h4');
const day2WeatherHeading = document.querySelector('#forecast-card-day2 h3');
const day2WeatherImg = document.querySelector('#forecast-card-day2 img');
const day2CurrentTempParagraph = document.querySelector(
  '#forecast-card-day2 #current-temp',
);
const day2LowParagraph = document.querySelector('#forecast-card-day2 #low');
const day2HighParagraph = document.querySelector('#forecast-card-day2 #high');
const day3DateHeading = document.querySelector('#forecast-card-day3 h4');
const day3WeatherHeading = document.querySelector('#forecast-card-day3 h3');
const day3WeatherImg = document.querySelector('#forecast-card-day3 img');
const day3CurrentTempParagraph = document.querySelector(
  '#forecast-card-day3 #current-temp',
);
const day3LowParagraph = document.querySelector('#forecast-card-day3 #low');
const day3HighParagraph = document.querySelector('#forecast-card-day3 #high');

function getCityValue() {
  const inputValue = inputElement.value;
  return inputValue;
}

async function getResponse(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=4431d0b0cbb648bca1b25001241503&q=${city}&days=3`,
    {
      mode: 'cors',
    },
  );
  return response.json();
}

// Webpage default state
async function getMyResponse() {
  const response = await getResponse('montreal');
}

// Date format
const options = {
  weekday: 'short',
  year: 'numeric',
  day: 'numeric',
  month: 'long',
};

// Instantly invoked
(function getCurrentDate() {
  const currentDate = new Date();
  dateP.textContent = currentDate.toLocaleDateString(undefined, options);
})();

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const inputValue = getCityValue();
  try {
    const response = await getResponse(inputValue);
    console.log(response);
    populateOnClick(response);
  } catch (error) {
    console.log('Error fetching weather data:', error);
  }
});

function populateOnClick(response) {
  // mid section
  locationSpan.textContent = response.location.name;
  currentWeatherP.textContent = response.current.condition.text;
  todayTempParagraph.textContent = response.current.temp_c;
  const currentWeatherUrl = response.current.condition.icon;
  weatherImg.src = `https:${currentWeatherUrl}`;

  feelsLikeParagraph.textContent = response.current.feelslike_c;
  humidityParagraph.textContent = `${response.current.humidity}%`;
  windParagraph.textContent = response.current.wind_kph;

  // bottom section
  // Day1
  const day1Date = response.forecast.forecastday[0].date;
  const day1DateObject = new Date(day1Date);
  const formattedDay1Date = day1DateObject.toLocaleDateString(
    undefined,
    options,
  );
  day1DateHeading.textContent = formattedDay1Date;

  day1WeatherHeading.textContent =
    response.forecast.forecastday[0].day.condition.text;
  const day1Url = response.forecast.forecastday[0].day.condition.icon;
  day1WeatherImg.src = `https:${day1Url}`;
  day1CurrentTempParagraph.textContent =
    response.forecast.forecastday[0].day.avgtemp_c;
  day1LowParagraph.textContent = response.forecast.forecastday[0].day.mintemp_c;
  day1HighParagraph.textContent =
    response.forecast.forecastday[0].day.maxtemp_c;

  // Day2
  const day2Date = response.forecast.forecastday[1].date;
  const day2DateObject = new Date(day2Date);
  const formattedDay2Date = day2DateObject.toLocaleDateString(
    undefined,
    options,
  );
  day2DateHeading.textContent = formattedDay2Date;
  day2WeatherHeading.textContent =
    response.forecast.forecastday[1].day.condition.text;
  const day2Url = response.forecast.forecastday[1].day.condition.icon;
  day2WeatherImg.src = `https:${day2Url}`;
  day2CurrentTempParagraph.textContent =
    response.forecast.forecastday[1].day.avgtemp_c;
  day2LowParagraph.textContent = response.forecast.forecastday[1].day.mintemp_c;
  day2HighParagraph.textContent =
    response.forecast.forecastday[1].day.maxtemp_c;

  // Day3
  const day3Date = response.forecast.forecastday[2].date;
  const day3DateObject = new Date(day3Date);
  const formattedDay3Date = day3DateObject.toLocaleDateString(
    undefined,
    options,
  );
  day3DateHeading.textContent = formattedDay3Date;
  day3WeatherHeading.textContent =
    response.forecast.forecastday[2].day.condition.text;
  const day3Url = response.forecast.forecastday[2].day.condition.icon;
  day3WeatherImg.src = `https:${day3Url}`;
  day3CurrentTempParagraph.textContent =
    response.forecast.forecastday[2].day.avgtemp_c;
  day3LowParagraph.textContent = response.forecast.forecastday[2].day.mintemp_c;
  day3HighParagraph.textContent =
    response.forecast.forecastday[2].day.maxtemp_c;

  // Give every temperature their respective unit
  unitSpans.forEach((span) => {
    span.textContent = '°C';
  });

  windUnitSpan.textContent = 'Kph';
}
