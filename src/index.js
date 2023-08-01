// obtain weather data for a location
async function getWeatherDataForLocation(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7bfb43be76904809a18182305233007&q=${location}&aqi=no`, {
        mode: 'cors'
    });

    const data = await response.json();
    console.log(data);

    // console.log(data.current.condition.feelslike_c)
    console.log(data.current.feelslike_c)
}

getWeatherDataForLocation('london');