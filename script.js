const apiKey = "505bcfa427946f18e668471e4215a340"; // from config.js

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!cityInput) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  let city = cityInput;
  if (!city.includes(",")) {
    city = `${city},ZA`; // default South Africa
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Change background based on weather
    changeBackground(data.weather[0].main);

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" />
      <p class="temp">${Math.round(data.main.temp)}°C</p>
      <p class="description">${data.weather[0].description}</p>
    `;

    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:#ffcccc;">${error.message}</p>`;
  }
}

function changeBackground(weather) {
  const body = document.body;

  switch (weather.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(to bottom right, #bdc3c7, #2c3e50)";
      break;
    case "rain":
      body.style.background = "linear-gradient(to bottom right, #4e54c8, #8f94fb)";
      break;
    case "thunderstorm":
      body.style.background = "linear-gradient(to bottom right, #141e30, #243b55)";
      break;
    case "snow":
      body.style.background = "linear-gradient(to bottom right, #e0eafc, #cfdef3)";
      break;
    default:
      body.style.background = "linear-gradient(to bottom right, #6dd5fa, #2980b9)";
  }
}


