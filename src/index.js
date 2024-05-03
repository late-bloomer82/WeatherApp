// Select all html elements required for page population
const unitSpans = document.querySelectorAll('.units');
const fahrenheitButton = document.getElementById('fahrenheit');
const celciusButton = document.getElementById('celcius');
const windUnitSpan = document.getElementById('wind-unit');
const inputElement = document.getElementById('input');
const searchButton = document.getElementById('searchButton');
const dateHeading = document.getElementById('date');
const locationSpan = document.getElementById('locationSpan');
const currentWeatherP = document.getElementById('current-weather');
const todayTempParagraph = document.getElementById('today-temp');
const weatherImg = document.getElementById('weather-img');
const feelsLikeParagraph = document.getElementById('feels-like-p');
const humidityParagraph = document.getElementById('humidity-p');
const windSpan = document.getElementById('wind-s');
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
(async () => {
  const response = await getResponse('montreal');
  populatePage(response);
})();

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
  dateHeading.textContent = currentDate.toLocaleDateString(undefined, options);
})();

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const inputValue = getCityValue();
  try {
    const response = await getResponse(inputValue);
    populatePage(response);
  } catch (error) {
    console.log('Error fetching weather data:', error);
  }
});
// unitsButtonToggle for button control
let unitsButtonToggle = true;

// Unit Conversions on button click
fahrenheitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (unitsButtonToggle) {
    fahrenheitButton.disabled = true;
    celciusButton.disabled = false;
    convertUnits('fahrenheit');
    unitsButtonToggle = false;
  }
});

// Default button state is disabled since the default data is in celcius
celciusButton.disabled = true;

celciusButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (unitsButtonToggle) {
    celciusButton.disabled = true;
  } else {
    convertUnits('celcius');
    celciusButton.disabled = true;
    fahrenheitButton.disabled = false;
    unitsButtonToggle = true;
  }
});

function stringToInteger(string) {
  const number = parseInt(string, 10);
  return number;
}
function stringToFloat(string) {
  const number = parseFloat(string);
  return number;
}
function roundNumber(number) {
  const roundedNumber = Math.round(number);
  return roundedNumber;
}

function convertUnits(type) {
  if (type === 'celcius') {
    // Convert value

    // fahrenheit to Celcius conversion
    const temperatureElements = document.querySelectorAll('.temperature');
    temperatureElements.forEach((element) => {
      const temperatureStringValue = element.textContent;
      const temperatureValue = stringToInteger(temperatureStringValue);
      const celcius = ((temperatureValue - 32) * 5) / 9;
      const roundedCelciusValue = roundNumber(celcius);
      element.textContent = roundedCelciusValue;
    });

    // Wind Mph to Kph conversion
    const windSpan = document.getElementById('wind-s');
    const windSpanString = windSpan.textContent;
    const MphWindValue = stringToFloat(windSpanString);
    const KphValue = MphWindValue * 1.609;
    const roundedKphWindValue = KphValue.toFixed(1);
    windSpan.textContent = roundedKphWindValue;

    // Change unit text
    const unitSpans = document.querySelectorAll('.units');
    const windUnitSpan = document.getElementById('wind-unit');
    windUnitSpan.textContent = 'Kph';
    unitSpans.forEach((span) => {
      span.textContent = '°C';
    });
  } else if (type === 'fahrenheit') {
    // Convert value

    // Celcius to fahrenheit conversion
    const temperatureElements = document.querySelectorAll('.temperature');
    temperatureElements.forEach((element) => {
      const temperatureStringValue = element.textContent;
      const temperatureValue = stringToInteger(temperatureStringValue);
      const fahrenheit = (temperatureValue * 9) / 5 + 32;
      const roundedfahrenheitValue = roundNumber(fahrenheit);
      element.textContent = roundedfahrenheitValue;
    });

    // Wind Kph to Mph conversion
    const windSpan = document.getElementById('wind-s');
    const windSpanString = windSpan.textContent;
    const KphWindValue = stringToFloat(windSpanString);
    const MphWindValue = KphWindValue / 1.609;
    const roundedMphWindValue = MphWindValue.toFixed(1);
    windSpan.textContent = roundedMphWindValue;

    // Change unit text
    const unitSpans = document.querySelectorAll('.units');
    const windUnitSpan = document.getElementById('wind-unit');
    windUnitSpan.textContent = 'Mph';
    unitSpans.forEach((span) => {
      span.textContent = '°F';
    });
  }
}

function populatePage(response) {
  // Mid section
  locationSpan.textContent = response.location.name;
  currentWeatherP.textContent = response.current.condition.text;
  todayTempParagraph.textContent = Math.round(
    parseFloat(response.current.temp_c),
  );
  weatherImg.src = `https:${response.current.condition.icon}`;
  feelsLikeParagraph.textContent = Math.round(
    parseFloat(response.current.feelslike_c),
  );
  humidityParagraph.textContent = `${response.current.humidity}%`;
  windSpan.textContent = Math.round(parseFloat(response.current.wind_kph));

  // Bottom section
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
  day1WeatherImg.src = `https:${response.forecast.forecastday[0].day.condition.icon}`;

  day1CurrentTempParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[0].day.avgtemp_c),
  );
  day1LowParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[0].day.mintemp_c),
  );
  day1HighParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[0].day.maxtemp_c),
  );

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
  day2WeatherImg.src = `https:${response.forecast.forecastday[1].day.condition.icon}`;

  day2CurrentTempParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[1].day.avgtemp_c),
  );
  day2LowParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[1].day.mintemp_c),
  );
  day2HighParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[1].day.maxtemp_c),
  );

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
  day3WeatherImg.src = `https:${response.forecast.forecastday[2].day.condition.icon}`;
  day3CurrentTempParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[2].day.avgtemp_c),
  );
  day3LowParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[2].day.mintemp_c),
  );
  day3HighParagraph.textContent = Math.round(
    parseFloat(response.forecast.forecastday[2].day.maxtemp_c),
  );

  // Give every temperature their respective unit
  unitSpans.forEach((span) => {
    span.textContent = '°C';
  });

  windUnitSpan.textContent = 'Kph';
}
