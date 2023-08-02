
import './style.css';
import './css/weather-icons.min.css'

let currentWeatherData = {};

function setCurrentWeatherData(newWeatherData) {
    currentWeatherData = newWeatherData;

}
// create class for weatherData objects
class WeatherData {
    constructor(
        time,
        date,
        location, 
        country, 
        lat, 
        lon,
        cloud,
        condition,
        tempC, 
        tempF,
        gustKph,
        gustMph,
        humidity,
        precipitationInch,
        precipitationMm,
        )
        {
            this.time = time;
            this.date = date;
            this.location = location;
            this.country = country; 
            this.lat = lat;
            this.lon = lon;
            this.cloud = cloud;
            this.condition = condition;
            this.tempC = tempC;
            this.tempF = tempF;
            this.gustKph = gustKph;
            this.gustMph = gustMph;
            this.humidity = humidity;
            this.precipitationInch = precipitationInch;
            this.precipitationMm = precipitationMm;
        }

}

async function getWeatherDataAndSetDisplay(location) {
    const weatherData = await getWeatherDataForLocation(location);
    setCurrentWeatherData(weatherData);
    setEntireDisplay();
}

// obtain weather data for a location
async function getWeatherDataForLocation(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7bfb43be76904809a18182305233007&q=${location}&aqi=no`, {
        mode: 'cors'
    });

    const data = await response.json();
    console.log(data);

    const weatherDataObject = new WeatherData(
        data.location.localtime.split(" ")[1],
        data.location.localtime.split(" ")[0],
        data.location.name,
        data.location.country,
        data.location.lat,
        data.location.lon,
        data.current.cloud,
        data.current.condition.text,
        data.current.feelslike_c,
        data.current.feelslike_f,
        data.current.gust_kph,
        data.current.gust_mph,
        data.current.humidity,
        data.current.precip_in,
        data.current.precip_mm,
    )

    console.log(data.location.name);

    setWeatherImage(data.current.condition.icon)
    return weatherDataObject;
}

function setWeatherImage(image) {
    const weatherImage = document.querySelector('#weather-image')
    weatherImage.src = image;
}

function setDisplayWithData(id, data) {
    const el = document.querySelector(id);
    el.textContent = data;
}

function setEntireDisplay() {
    setDisplayWithData('#name', currentWeatherData.location);
    setDisplayWithData('#country', currentWeatherData.country);
    setDisplayWithData('#condition', currentWeatherData.condition);
    setDisplayWithData('#time', currentWeatherData.time);
    setDisplayWithData('#date', currentWeatherData.date);
    setDisplayWithData('#lat', `${currentWeatherData.lat}°`);
    setDisplayWithData('#lon', `${currentWeatherData.lon}°`);
    setDisplayWithData('#tempC', `${currentWeatherData.tempC} °C`);
    setDisplayWithData('#tempF', `${currentWeatherData.tempF} °F`);

    setDisplayWithData('#gustMph', `${currentWeatherData.gustMph} mph`);
    setDisplayWithData('#humidity', `${currentWeatherData.humidity} %`);
    setDisplayWithData('#precipitationMm', `${currentWeatherData.precipitationMm} mm`);
}

getWeatherDataAndSetDisplay('santa moniz');
// const locationSubmit = document.querySelector('#location-submit')
const locationSearch = document.querySelector('#location-search');
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherDataAndSetDisplay(locationSearch.value);
})