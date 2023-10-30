const userFormEl = document.querySelector('#user-input');

const cityInputEl = document.querySelector('#cityname');

const timeZone = document.querySelector('#time-zone');
const state = document.querySelector('#state');
const futureTime = document.querySelector('future-forecast');
const today = document.querySelector('future-forecast');
const currentTemp = document.querySelector('current-temp');
const day = document.querySelector('day');
let temperature = document.querySelector('temperature');
let humidity = document.querySelector('humidity');
let wind = document.querySelector('wind');
const forecast = document.querySelector('#future-forecast');

let weatherForecast = document.querySelector('.weather-forecast');
// const weatherForecastItem = document.querySelector('weather-forecast-item');
let citySearchTerm = document.querySelector('#city-search-term');

const resultContainerEl = document.querySelector('#result-container');

const formSubmitHandler = function (event) {
    event.preventDefault();

    const cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);

        // resultContainerEl.textContent = '';
        cityInputEl.value = '';


    } else {
        alert('Please enter a city');
    }
};

// const buttonClickHandler = function (event) {
//     const city = event.target.getAttribute('data-city');

//     if (city) {
//         getFeaturedCities(city);

//         cityButtonsEl.textContent = '';
//     }
// };

const getCityWeather = function (user) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityInputEl.value + '&units=imperial&appid=343936b9fd05267869e0bf8c1d533d1c';


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayCities(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Application');
        });
};




function displayCities(data) {
    // let currentForecast = 0;

    // currentWeather = [temperature, humidity, wind];
    // console.log(currentWeather);
    // citySearchTerm.innerHTML = cityInputEl.value;
    // console.log(cityInputEl.value)


    // if (currentForecast < 5) {
    //     console.log(currentForecast);
    //     // currentWeather.textContent = resultContainerEl
    //     resultContainerEl.innerHTML = '';

    // }
    for (let i = 7; i < data.list.length; i += 8) {
        var result = document.createElement('div');
        var dateEl = document.createElement('p');
        var tempEl = document.createElement("p")
        console.log(result);

        var weatherForecastData = data.list[i];
        console.log(weatherForecastData);

        var dayTemperature = weatherForecastData.main.temp;
        console.log(temperature)
        var dayHumidity = weatherForecastData.main.humidity;
        console.log(humidity)
        var dayWind = weatherForecastData.wind.speed;
        console.log(wind)
        var dayDates = new Date(weatherForecastData.dt * 1000).toLocaleDateString();

        result.classList = 'col-12 col-md-6';
        dateEl.textContent = dayDates
        tempEl.textContent = dayTemperature
        // currentWeather.appendChild(titleEl);
        // resultContainerEl.appendChild(weatherForecast);
        result.append(dateEl, tempEl);
        forecast.append(result);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);
