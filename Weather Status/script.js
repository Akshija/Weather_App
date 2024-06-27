document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '323e9777d91f19792608713cebebcaaa'; 
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const fetchWeather = async () => {
        const city = prompt('Enter city name:');
        if (!city) return;

        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === '404') {
                alert('City not found. Please try again.');
                return;
            }

            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const displayWeather = (data) => {
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const weatherIconElement = document.getElementById('weather-icon');
    
        if (data.name && data.sys && data.sys.country) {
            locationElement.textContent = data.name + ', ' + data.sys.country;
        } else {
            locationElement.textContent = 'Location data not available';
        }
    
        if (data.main && data.main.temp) {
            temperatureElement.textContent = 'Temperature: ' + data.main.temp + '°C';
        } else {
            temperatureElement.textContent = 'Temperature data not available';
        }
    
        if (data.weather && data.weather[0] && data.weather[0].description) {
            descriptionElement.textContent = 'Condition: ' + data.weather[0].description;
            const iconCode = data.weather[0].icon;
            weatherIconElement.className = 'weather-icon fas fa-' + iconCode;
        } else {
            descriptionElement.textContent = 'Weather data not available';
        }
    };
    

    document.getElementById('fetchWeather').addEventListener('click', fetchWeather);
});
