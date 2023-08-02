
let currentWeatherData = {};

function setCurrentWeatherData(newWeatherData) {
    currentWeatherData = newWeatherData;

}
// create class for weatherData objects
class WeatherData {
    constructor(
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
// obtain weather data for a location
async function getWeatherDataForLocation(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7bfb43be76904809a18182305233007&q=${location}&aqi=no`, {
        mode: 'cors'
    });

    const data = await response.json();
    console.log(data);

    const weatherDataObject = new WeatherData(
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

    // this is probably bad code... 
    setWeatherImage(data.current.condition.icon)
    setCurrentWeatherData(weatherDataObject);
    console.log(currentWeatherData);

    setEntireDisplay();
    

    console.log(weatherDataObject);

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
    setDisplayWithData('#precipiationInch', currentWeatherData.precip_in);
    setDisplayWithData('#precipitationMm', currentWeatherData.precip_mm);

}

getWeatherDataForLocation('santa moniz');
const locationSubmit = document.querySelector('#location-submit')
const locationSearch = document.querySelector('#location-search');

locationSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeatherDataForLocation(locationSearch.value)
    console.log(currentWeatherData)
    // setEntireDisplay();



})