// Animated Background

const canvas = document.getElementById("animatedBack")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray;
// Get Mouse position
let mouse = {
  x = null,
  y = null,
  radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener("mouseover", function(event){
  mouse.x = event.x
  mouse.y = event.y
})
// Create particles
class Particles {
  constructor(x, y, directionX, directionY, size, color){
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
  }
  // Methos to draw to particles
  draw (){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = '#8C5523'
    ctx.fill()
  }
  // Check Positive, mouse position, moveover,
  // draws particles
  update(){
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY
    }
    // Check collision detection
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx*dx + dy*dy)
  }
}

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
