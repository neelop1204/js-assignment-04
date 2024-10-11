document.addEventListener('DOMContentLoaded', () => {
    const studentInfo = document.getElementById('student-info');
    const myStudentID = '200556051';
    const myName = 'Neel Patel';

    studentInfo.textContent = `Student ID: ${myStudentID}, Name: ${myName}`;

    const apiKey = 'ca53be9d36e0d5ae661fa891d73f2e73';
    let cityInput = document.getElementById('city-input');
    let fetchDataButton = document.getElementById('fetch-data-btn');
    let weatherInfo = document.getElementById('weather-info');
    let cityLocation = document.getElementById('city-location');

    fetchDataButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const description = data.weather[0].description;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const cloudiness = data.clouds.all;
            const visibility = data.visibility;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');

            const temperatureIcon = '<i class="fas fa-thermometer-half"></i>';
            const descriptionIcon = '<i class="fas fa-cloud"></i>';
            const pressureIcon = '<i class="fas fa-tachometer-alt"></i>';
            const humidityIcon = '<i class="fas fa-tint"></i>';
            const windIcon = '<i class="fas fa-wind"></i>';
            const visibilityIcon = '<i class="fas fa-eye"></i>';
            const sunriseIcon = '<i class="fas fa-sunrise"></i>';
            const sunsetIcon = '<i class="fas fa-sunset"></i>';

            weatherInfo.innerHTML = `
                ${temperatureIcon} <strong>Temperature:</strong> ${temperature}°C<br>
                ${temperatureIcon} <strong>Feels Like:</strong> ${feelsLike}°C<br>
                ${descriptionIcon} <strong>Description:</strong> ${description}<br>
                ${pressureIcon} <strong>Pressure:</strong> ${pressure} hPa<br>
                ${humidityIcon} <strong>Humidity:</strong> ${humidity}%<br>
                ${windIcon} <strong>Wind Speed:</strong> ${windSpeed} m/s<br>
                ${visibilityIcon} <strong>Visibility:</strong> ${visibility} meters<br>
                ${sunriseIcon} <strong>Sunrise:</strong> ${sunrise}<br>
                ${sunsetIcon} <strong>Sunset:</strong> ${sunset}<br>
                <i class="fas fa-cloud-sun"></i> <strong>Cloudiness:</strong> ${cloudiness}%
            `;

            cityLocation.textContent = `Location: ${city}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherInfo.textContent = `Error fetching data: ${error.message}`;
        });
    });
});
