'use strict'

const cityInput = document.querySelector("#cityInput")
const submitButton = document.querySelector("#cityInput")
const tempContainer = document.querySelector(".temp-container")


let currentCity = function (obj) {
  const arrayOfObjects = Object.values(obj).map(ele => ele)
  console.log(arrayOfObjects);

}


async function fetchDat(city = "cairo") {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=61c0cd4875954d36bf9144426240510&days=3&q=${city}`
    )
    let data = await response.json()
    console.log(data);
console.log("***************************************");
    currentCity(data)
console.log("****************************************");
    console.log(data.location.lat);
console.log("****************************************")
    displayCards(data)
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition,errorPosition)
}else{
  console.log("not supported")
}


function showPosition(position) {
  const longitude = position.coords.longitude
  const latitude = position.coords.latitude
  console.log(`longitude:${longitude} , latitude :${latitude}`);
  
}

function errorPosition() {
  console.log("errpr");
  
}


fetchDat()

cityInput.addEventListener("input",function(){ fetchDat(cityInput.value)})
// submitButton.addEventListener("click", function(){ fetchDat(cityInput.value)})


function getDayName(date) {

let day
  switch (new Date(date).getDay()) {
    case 0:
      day = "Sunday"
      break;
    case 1:
      day = "Monday"
      break;
    case 2:
      day = "Tuesday"
      break;
    case 3:
      day = "Widnesday"
      break;
    case 4:
      day = "Thursday"
      break;
    case 5:
      day = "Friday"
      break;
    case 6:
      day = "Saturday"
      break;
    default:
      day = "hhhh"
      break;
  }
  return day
}
function getDayAndMonth(date) {
  let dateConversion = new Date(date)
  let result =  dateConversion.toLocaleString('en-GB',{month:"long",day:"numeric"})
  return result.replace(" ","")

}

function displayCards(obj){

tempContainer.innerHTML = ` 

          <div class="col-12 col-lg-4">
              <div class="card main-bg">
                  <div class="header d-flex justify-content-between p-2">
                    <p class="day">${getDayName(obj.forecast.forecastday[0].date)}</p>
                    <p class="date">${getDayAndMonth(obj.forecast.forecastday[0].date)}</p>
                  </div>
                <div class="inner p-3">
                  <div class="card-body">
                    <h5 class="city">${obj.location.name}</h5>
                    <div class="temp-img d-sm-flex d-lg-block">
                      <p class="card-text text-white display-1 fw-bold me-3">${obj.current.temp_c}<sup>o</sup>C</p>   
                      <img src="${obj.current.condition.icon}" class="first-icon" alt="">                   
                    </div>

                    <p class="status status-color">
                    ${obj.current.condition.text}
                    </p>

                    <div class="footer d-flex mt-3">
                      <div class="icon d-flex align-items-center me-4">
                        <i class="fa-solid fa-umbrella me-1"></i>
                        <p class="m-0">20%</p>
                      </div>
                      <div class="icon d-flex align-items-center me-4">
                        <i class="fa-solid fa-wind me-1"></i>
                        <p class="m-0">${obj.current.wind_kph} kph</p>
                      </div>
                      <div class="icon d-flex align-items-center">
                        <i class="fa-solid fa-compass me-1"></i>
                        <p class="m-0">East</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-4">
              <div class="card h-100 main-bg" >
                  <div class="header d-flex justify-content-center p-2">
                    <p class="day">${getDayName(obj.forecast.forecastday[1].date)}</p>
                  </div>
                <div class="inner p-3">
                  <div class="card-body pt-4">
                    <div class="temp-img text-center">
                      <img src="${obj.forecast.forecastday[1].day.condition.icon}" class="" alt="">                   
                      <p class="card-text text-white display-6 fw-bold mb-1">${obj.forecast.forecastday[1].day.maxtemp_c
                      }<sup>o</sup>C</p>   
                      <p class="card-text mb-4">${obj.forecast.forecastday[1].day.mintemp_c
                      }<sup>o</sup></p>   
                    </div>
                    <p class="status status-color text-center">
                    ${obj.forecast.forecastday[1].day.condition.text}
                    </p>

                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-4">
              <div class="card h-100 main-bg" >
                  <div class="header d-flex justify-content-center p-2">
                    <p class="day">${getDayName(obj.forecast.forecastday[2].date)}</p>
                  </div>
                <div class="inner p-3">
                  <div class="card-body pt-4">
                    <div class="temp-img text-center">
                      <img src="${obj.forecast.forecastday[2].day.condition.icon}" class="" alt="">                   
                      <p class="card-text text-white display-6 fw-bold mb-1">${obj.forecast.forecastday[2].day.maxtemp_c
                      }<sup>o</sup>C</p>   
                      <p class="card-text mb-4">${obj.forecast.forecastday[2].day.mintemp_c
                      }<sup>o</sup></p>   
                    </div>

                    <p class="status status-color text-center">
                    ${obj.forecast.forecastday[2].day.condition.text}
                    </p>

                </div>
              </div>
            </div>
          </div>

`
}




// function getCurrentLocation() {
//   navigator.geolocation.getCurrentPosition(function(result) {
//     result.coords.latitude; // latitude value
//     result.coords.longitude; // longitude value
//   });
// }