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

    console.log(weatherDataObject);

}

getWeatherDataForLocation('santa moniz');
const locationSubmit = document.querySelector('#location-submit')
const locationSearch = document.querySelector('#location-search');

locationSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(locationSearch.value)
    getWeatherDataForLocation(locationSearch.value)
})