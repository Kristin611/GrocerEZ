document.addEventListener("DOMContentLoaded", function () {
  // API Key for weather data (replace with your own)
  const apiKey = "8c4febd32c6b1c91aee4fdb805d2b5ea";
  const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  
  // Function to convert Celsius to Fahrenheit
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }

  // Function to get current time
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }
  
  // Function to update weather and time based on geolocation
  function updateWeatherAndTime() {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`${weatherApiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Convert temperature to Fahrenheit
        const fahrenheitTemp = celsiusToFahrenheit(data.main.temp);

        document.getElementById('temp').textContent = `${fahrenheitTemp.toFixed(1)}°F`;
        document.getElementById('city').textContent = data.name;

      } catch (error) {
        // Display error message if weather data cannot be fetched
        document.getElementById('error').style.display = 'block';
      }
    });
    
    // Update time every second
    setInterval(function () {
      document.getElementById('currentTime').textContent = getCurrentTime();
    }, 1000);
  }

  // Initial update with current location
  updateWeatherAndTime();
});
