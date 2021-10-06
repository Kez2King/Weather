//fetch data from weather api

function weatherData(cityID) {
  let key = "e1dbe5d9b3f3db1dbeb49b83cfbafb0e";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${cityID}&appid=${key}`
  )
    .then(function (resp) {
      return resp.json();
    }) //convert data to json
    .then(function (data) {
      console.log(data);
      drawWeather(data);
    })
    .catch(function () {
      //catch any error
    });
}

function getWeather(event) {
  event.preventDefault();
  var data = document.getElementById("data");
  weatherData(data.value);
}

function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);

  document.getElementById("description").innerHTML = d.weather[0].description;
  document.getElementById("temp").innerHTML = celcius + "&deg;";
  document.getElementById("location").innerHTML = d.name;
}
