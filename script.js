var userFormEl = document.querySelector('#user-input');
var languageButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#cityname');
var resultContainerEl = document.querySelector('#result-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getUserRepos(cityname);

        resultContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};

var buttonClickHandler = function (event) {
    var language = event.target.getAttribute('data-city');

    if (language) {
        getFeaturedRepos(language);

        resultContainerEl.textContent = '';
    }
};

var getUserRepos = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=""&lon=""&appid=7b9e83b916217cf85fb25364854614d5'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Application');
        });
};

var getFeaturedCities = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + city;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

var displayCities = function (cities, searchTerm) {
    if (cities.length === 0) {
        repoContainerEl.textContent = 'No repositories found.';
        return;
    }

    citySearchTerm.textContent = searchTerm;

    for (var i = 0; i < cities.length; i++) {
        var cityName = city[i].owner.login + '/' + cities[i].name;

        var cityEl = document.createElement('a');
        cityEl.classList = 'list-item flex-row justify-space-between align-center';
        cityEl.setAttribute('href', './single-repo.html?repo=' + cityName);

        var titleEl = document.createElement('span');
        titleEl.textContent = cityName;

        cityEl.appendChild(titleEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if (cities[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        cityContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
