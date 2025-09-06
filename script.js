 const apiKey = "505bcfa427946f18e668471e4215a340"; // from config.js

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!cityInput) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // If no country code provided, default to South Africa (ZA)
  let city = cityInput;
  if (!city.includes(",")) {
    city = `${city},ZA`;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" />
      <p class="temp">${Math.round(data.main.temp)}°C</p>
      <p class="description">${data.weather[0].description}</p>
    `;

    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
