// home.js
function renderPage() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "weather-app";

  const polishCities = [
    "Warszawa",
    "Kraków",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Szczecin",
    "Bydgoszcz",
    "Lublin",
    "Białystok",
    "Katowice",
    "Gdynia",
    "Częstochowa",
    "Radom",
    "Sosnowiec",
    "Toruń",
    "Kielce",
    "Rzeszów",
    "Gliwice",
    "Zabrze",
    "Olsztyn",
    "Bytom",
    "Rybnik",
    "Tychy",
    "Opole",
  ];

  // conent top
  const contentTop = document.createElement("div");
  contentTop.className = "content-top";

  const currentDateSection = document.createElement("div");
  currentDateSection.className = "current-date-time";
  const currentDate = document.createElement("p");
  currentDate.className = "current-date";
  const currentTime = document.createElement("p");
  currentTime.className = "current-time";
  currentDateSection.appendChild(currentDate);
  currentDateSection.appendChild(currentTime);

  const getCurrentDateTime = () => {
    const dateAndTime = new Date();
    const formattedDate = dateAndTime.toLocaleDateString();
    const formattedTime = dateAndTime.toLocaleTimeString();
    const [hours, minutes, seconds, meridiem] = formattedTime.split(/:| /);

    currentDate.textContent = "Today is: " + formattedDate;
    currentTime.textContent = hours + ":" + minutes + " " + meridiem;
  };
  getCurrentDateTime();

  setInterval(() => {
    getCurrentDateTime();
  }, 1000);

  const forecastDateCity = document.createElement("div");
  forecastDateCity.className = "forecast-date-city";

  const forecastDate = document.createElement("div");
  forecastDate.className = "forecast-date";

  forecastDate.innerHTML = `
  <p>Weather forecast for:</p>
  <p>Date</p>
  <p>City</p>
  `;

  const days = document.createElement("div");
  days.className = "days";

  for (i = 1; i <= 7; i++) {
    const dayTag = document.createElement("p");
    dayTag.textContent = i;
    dayTag.className = "day" + (i === 1 ? " active" : "");
    days.appendChild(dayTag);
    dayTag.addEventListener("click", () => {
      days.childNodes.forEach((i) => (i.className = "day"));
      dayTag.classList.add("active");
      getWeather();
    });
  }

  const forecastCity = document.createElement("div");
  forecastCity.className = "forecast-city";
  const citySelect = document.createElement("select");
  polishCities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.text = city;
    citySelect.appendChild(option);
  });

  forecastCity.appendChild(citySelect);

  forecastDateCity.appendChild(forecastDate);
  forecastDateCity.appendChild(forecastCity);

  const generalForecast = document.createElement("div");
  generalForecast.className = "general-forecast";

  generalForecast.innerHTML = `
  <div class="general-forecast-left">
  <img id="weather-icon"/>
  <p>cloudy</p>
  </div>
  <div class="general-forecast-right">
  <div>
  <div>
  <img id="temp-icon" src="./assets/weather-icons/temperature.png"/>
  </div>
  <div>
  <div>
  <p class="temperature" >25</p>
  <button class="deg active" >℃</button>
  <span> | </span>
  <button class="deg" >℉</button>
  </div>
  <p class="feels-like" >Feels like 23 &deg;</p>
  </div>
  </div>
  <div>
  <p class="temp-max" >Maximum Temperature: 0 ℃</p>
  <p class="temp-min" >Minimum Temperature: 0 ℃</p>
  <p class="humidity" >Humidity: 0%</p>
  <p class="wind-speed" >Wind: 15 km/h</p>
  <p class="humidity" ></p>
  </div>
  <div>
  <p>Partly cloudy throughout the day with a chance of rain or snow throughout the day.</p>
  </div>
  </div>

  `;

  generalForecast.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      generalForecast.querySelectorAll('button').forEach(button => {
        button.classList.remove('active');
      });
      e.target.classList.add('active');
    }
    getWeather();
  });

  contentTop.appendChild(currentDateSection);
  contentTop.appendChild(forecastDateCity);
  contentTop.appendChild(generalForecast);
  contentTop.appendChild(days);
  pageContainer.appendChild(contentTop);

  // content bottom

  // on change trigger getWeather
  citySelect.addEventListener("change", () => {
    getWeather();
  });
  getWeather();

  // get data from weather API
  function getWeather() {
    const apiKey = "UGBSA6S3JFAHQZYBZVBZALEET";
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/
timeline/${citySelect.value}?unitGroup=us&key=${apiKey}&contentType=json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        data.days.slice(0, 7).forEach((dayData, index) => {
          const date = new Date(dayData.datetime);
          days.childNodes[index].textContent = daysOfWeek[date.getDay()];
          if (days.childNodes[index].className.includes("day active")) {
           forecastDate.querySelector('p:nth-child(2)').textContent = daysOfWeek[date.getDay()] + " " + dayData.datetime;
           forecastDate.querySelector('p:nth-child(3)').textContent = citySelect.value;
           generalForecast.querySelector('#weather-icon').src = "./assets/weather-icons/" + dayData.icon + ".png";
           generalForecast.querySelector('#weather-icon').src = "./assets/weather-icons/" + dayData.icon + ".png";
           const tempUnit = generalForecast.querySelector('button.deg.active').textContent;
           generalForecast.querySelector('.general-forecast-left p').textContent = dayData.preciptype.join(' ').charAt(0).toUpperCase() + dayData.preciptype.join(' and ').slice(1);
           generalForecast.querySelector('.temperature').textContent = tempUnit === '℃' ? Math.round((dayData.temp - 32) * 5/9) : dayData.temp;
           generalForecast.querySelector('.feels-like').textContent = `Feels like ${tempUnit === '℃' ? Math.round((dayData.feelslike - 32) * 5/9) : dayData.feelslike} ${tempUnit}`;
           generalForecast.querySelector('.general-forecast-right .temp-max').textContent = `Maximum Temperature: ${tempUnit === '℃' ? Math.round((dayData.tempmax - 32) * 5/9) : dayData.tempmax} ${tempUnit}`;
           generalForecast.querySelector('.general-forecast-right .temp-min').textContent = `Minimum Temperature: ${tempUnit === '℃' ? Math.round((dayData.tempmin - 32) * 5/9) : dayData.tempmin} ${tempUnit}`;
           generalForecast.querySelector('.general-forecast-right .humidity').textContent = `Humidity: ${dayData.humidity} %`;
           generalForecast.querySelector('.general-forecast-right .wind-speed').textContent = `Wind: ${Math.round(dayData.windspeed * 1.60934)} km/h`;


          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return pageContainer;
}
