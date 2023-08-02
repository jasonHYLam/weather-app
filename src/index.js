
import './style.css';

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
        data.location.localtime,
        data.location.localtime,
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
    setDisplayWithData('#time', currentWeatherData.time);
    setDisplayWithData('#date', currentWeatherData.date);
    setDisplayWithData('#country', currentWeatherData.country);
    setDisplayWithData('#name', currentWeatherData.name);
    setDisplayWithData('#lat', currentWeatherData.lat);
    setDisplayWithData('#lon', currentWeatherData.lon);
    
    setDisplayWithData('#condition', currentWeatherData.condition);
    setDisplayWithData('#cloud', currentWeatherData.cloud);
    setDisplayWithData('#tempC', currentWeatherData.tempC);
    setDisplayWithData('#tempF', currentWeatherData.tempF);
    setDisplayWithData('#gustKph', currentWeatherData.gustKph);
    setDisplayWithData('#gustMph', currentWeatherData.gustMph);
    setDisplayWithData('#humidity', currentWeatherData.humidity);
    setDisplayWithData('#precipitationInch', currentWeatherData.precip_in);
    setDisplayWithData('#precipitationMm', currentWeatherData.precip_mm);
}

getWeatherDataAndSetDisplay('santa moniz');
const locationSubmit = document.querySelector('#location-submit')
const locationSearch = document.querySelector('#location-search');

locationSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    // getWeatherDataForLocation(locationSearch.value)
    getWeatherDataAndSetDisplay(locationSearch.value);
})