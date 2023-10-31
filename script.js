const userFormEl = document.querySelector('#user-input');

const cityInputEl = document.querySelector('#cityname');


const futureTime = document.querySelector('future-forecast');
const today = document.querySelector('future-forecast');
const currentTemp = document.querySelector('current-temp');
const day = document.querySelector('day');
let temperature = document.querySelector('temperature');
let humidity = document.querySelector('humidity');
let wind = document.querySelector('wind');
const forecast = document.querySelector('#future-forecast');

let weatherForecast = document.querySelector('.weather-forecast');
let citySearchTerm = document.querySelector('#city-search-term');

const resultContainerEl = document.querySelector('#result-container');

const formSubmitHandler = function (event) {
    event.preventDefault();

    const cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);

        cityInputEl.value = '';


    } else {
        alert('Please enter a city');
    }
};
//edited API to include user entry for city name as well as a query for imperial units.
const getCityWeather = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInputEl.value + '&units=imperial&list.weather.id&appid=343936b9fd05267869e0bf8c1d533d1c';


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
    // created variables to contain temperature, humidity and wind speed on the html page.
    for (let i = 0; i < 1; i += 8) {
        var weatherForecastToday = data.list[0];
        var todayTemperature = weatherForecastToday.main.temp;
        var todayHumidity = weatherForecastToday.main.humidity;
        var todayWind = weatherForecastToday.wind.speed;

        todayTempEl = document.querySelector("#temperature");
        todayHumidEl = document.querySelector("#humidity");
        todayWindEl = document.querySelector("#wind");

        //used the following script to capture the data from each desired value in the array, appended and displayed it on the appropriate section on the html
        todayTempEl.textContent = 'Temperature: ' + todayTemperature + ' F' + ',' + '';
        console.log(todayTempEl.textContent);
        todayHumidEl.textContent = 'Humidity: ' + todayHumidity + ' g/m3' + ',' + '';
        todayWindEl.textContent = 'Wind Speed: ' + todayWind + ' KT';

        resultContainerEl.append(todayTempEl, todayHumidEl, todayWindEl);
        forecast.append(resultContainerEl);
    }

    //created a separate loop to gather data for the 5-day forecast. Becuase it was arranged in 3-hour increments, I had to adjust the loop to account for this, skipping through the eigth array in each to aggregate the appropriate information for each day in the forecast. 
    for (let i = 7; i < data.list.length; i += 8) {
        var result = document.createElement('div');

        var dateEl = document.createElement('p');
        var tempEl = document.createElement("p");
        var humidEl = document.createElement("p");
        var windEl = document.createElement("p");


        console.log(result);

        var weatherForecastData = data.list[i];
        console.log(data);



        var dayTemperature = weatherForecastData.main.temp;
        var dayHumidity = weatherForecastData.main.humidity;
        var dayWind = weatherForecastData.wind.speed;
        //in order to obtain the data dynamically I used the ID which was comprised of the unix time (this represents the number of miliseconds that has passed since January 1970). However the data was displayed in seconds so we had to multiply by 1000 to get the appropriate value. 
        //the toLocaleDateString method updates the value so that it suits user in their respective timezone.        
        var dayDates = new Date(weatherForecastData.dt * 1000).toLocaleDateString();

        result.classList = 'col-12 col-md-6 flex-row align-center';
        dateEl.textContent = dayDates;
        tempEl.textContent = 'Temperature: ' + dayTemperature + ' F';
        humidEl.textContent = 'Humidity: ' + dayHumidity + ' g/m3';
        windEl.textContent = 'Wind Speed: ' + dayWind + ' KT';


        //this appended the values gathered to specific areas on the page. 
        result.append(dateEl, tempEl, humidEl, windEl);
        localStorage.setItem('Todays temp', todayTemperature, 'Todays humidity', todayHumidity, 'Todays wind', todayWind, '5-day date', dayDates, '5-day temp', dayTemperature, '5-day humid', dayHumidity, '5-day wind', dayWind);
        forecast.append(result);



    }
};
//this called the function on a submit (which is initiated on a button click).
userFormEl.addEventListener('submit', formSubmitHandler);
