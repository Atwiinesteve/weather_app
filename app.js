// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

// App Storage
const weather = {};

// App Storage Information
weather.temperature = {
        unit: 'Celcius'
}

// Weather Data
const KELVIN = 273; // Kelvin Value
const apiKey = '82005d27a116c2880c8f0fcb866998a0'; // api key

// Check if user's browser supports geolocation
if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
        notificationElement.style.display = 'block';
        notificationElement.innerHTML = '<p>Browser doesn\'t support location.</p>';
}

// Set Users's position.
function showPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude);
}

// Set error message when user's browser does not support geolocation.
function showError(error) {
        notificationElement.style.display = 'block';
        notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather function
function getWeather(latitude, longitude) {
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(api)
                .then((response) => {
                        let data = response.json();
                        return data;
                        // console.log(data);
                })
                .then((data) => {
                        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                        weather.description = data.weather[0].description;
                        weather.icon = data.weather[0].icon;
                        weather.city = data.name;
                        weather.country = data.sys.country;
                        // console.log(data)
                })
                .then(() => {
                        displayWeather();
                })
}

// Display Weather to User.
function displayWeather() {
        iconElement.innerHTML = `<img src = "icons/${weather.icon}.png" />`;
        temperatureElement.innerHTML = `${weather.temperature.value} <span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Convert C to F
function convertCtoF(temperature) {
        return (temperature * 9/5) + 32;
}

// Click to Convert
temperatureElement.addEventListener('click', function() {
        if(weather.temperature.value === undefined) return;
        if(weather.temperature.unit == 'Celcius') {
                let fahrenheit = convertCtoF(weather.temperature.value);
                fahrenheit = Math.floor(fahrenheit);
                temperatureElement.innerHTML = `${fahrenheit} <span>F</span>`;
                weather.temperature.unit = 'Fahrenheit'
        } else {
                temperatureElement.innerHTML = `${weather.temperature.value} <span>C</span>`;
                weather.temperature.unit = 'Celcius'
        }
});