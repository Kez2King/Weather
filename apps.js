//fetch data from weather api

let box = document.getElementById("wbox");
let submit = document.getElementById("sub");

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
  // For todays date;
  let day = new Date().toLocaleString()
  document.getElementById("time").innerHTML = day
  
}

// Animated Background
const canvas = document.getElementById("animatedBack")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray;
// Get Mouse position
let mouse = {
  x: null ,
  y: null ,
  radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener("mouseover",
  function(event){
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
    ctx.fillStyle = '#FFFFFF'
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
    if (distance < mouse.radius + this.size){
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10
      }
      if (mouse.x > this.x && this.x > canvas.width * 10) {
        this.x -= 10
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.x += 10
      }
      if (mouse.y > this.y && this.y > canvas.height * 10) {
        this.x -= 10
      }
    }
    // Moves Particles
    this.x += this.directionX
    this.y += this.directionY
    // Draw Particles
    this.draw()
    
  }
}
// Create Particle Array
function init(){
  particlesArray = []
  let numberofParticles = (canvas.height * canvas.width) / 9000
  for (let i = 0; i < numberofParticles * 2; i++) {
    let size = (Math.random() * 5) + 1
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
    let directionX = (Math.random() * 5) - 2.5
    let directionY = (Math.random() * 5) - 2.5
    let color = '#FFFF00'

    particlesArray.push(new Particles(x, y, directionX, directionY, size, color))
  }
}

// Check if particles are close enough to draw lines
function connect(){
  let opacityValue = 1 
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = 0; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)
      + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
      )

      if (distance < (canvas.width / 0.15) * (distance < (canvas.height / 0.15))){
        opacityValue = 1 - (distance / 500)
        ctx.strokeStyle = 'rgb(255,255,255, + opacitValue)'
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
        ctx.stroke()
      }
    }
  }
}
init();
animate();

// Animation Loop
function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
  }
  connect()
}
// Resize event
window.addEventListener('resize', function (){
  canvas.width = innerWidth
  canvas.height = innerHeight
  mouse.radius = ((canvas.height / 160) * (canvas.height / 160))
  init()
})

//mouse out event
window.addEventListener('mouseout', function (){
  mouse.x = undefined
})

function makeBox(){
  box.style.border = "2px solid black";
}

submit.addEventListener('click', makeBox);