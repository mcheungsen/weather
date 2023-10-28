const doc = {
    button: document.getElementById('menu').querySelector('button'),
    data: document.getElementById('data'),
    text: document.getElementById('menu').querySelector('input[type="text"]')
}

const api = "https://www.prevision-meteo.ch/services/json/"


/**
 * get Data from api url
 * @param {} city 
 */
function getData(city) {
    return fetch(api + city)
        .then(response => {
            return (response.json())
        })
        .catch(error => {
            console.error("Erreur : " + error.message)
        })
}

/**
 * Handle data to get current weather
 * @param {*} city 
 */
function handleData(city) {
    getData(city)
        .then(data => {
            return (data)
        })
        .then(data => {
            console.log(data)
            // wrong value for city => error
            if (data.errors) {
                doc.data.innerHTML = "pas trouvé"
            }
            // use Data
            else {
                doc.data.classList.remove('visible');
                setTimeout(function(){
                    doc.data.innerHTML = ""
                    getCurrentWeather(data)
                    getTodayWeather(data)
                    doc.data.classList.add('visible');
                },200)

                
            }
        })
    
}

function getCurrentWeather(data) {
    // Create new div for current Weather
    let div = document.createElement("div");
    div.id = "current-weather";

    let right_box = document.createElement("div");
    right_box.id = "right-box";
    right_box.appendChild(document.createElement("p")).innerHTML =
        "Météo<br>" 
        + data.fcst_day_0.day_long + " " + data.current_condition.hour + "<br>"
        + data.current_condition.condition;
    
    let left_box = document.createElement("div");
    left_box.id = "left-box";
    
    // Children of left_box
    let curr_weather_box = document.createElement("div");
    curr_weather_box.id = "curr-weather-box"

    let tmp = document.createElement("div")
    tmp.id = "tmp"
    tmp.appendChild(document.createElement("p")).textContent = data.current_condition.tmp + "°C"
    tmp.appendChild(document.createElement("p")).textContent = data.fcst_day_0.tmin + " °C / " 
        + data.fcst_day_0.tmax + " °C"
    tmp.lastChild.id = "tmp-min-max"

    curr_weather_box.appendChild(document.createElement("img")).src = data.current_condition.icon_big;
    curr_weather_box.appendChild(tmp);
    curr_weather_box.appendChild(document.createElement("p")).innerHTML = 
        "humidité : "+ data.current_condition.humidity + " %<br>"
        + "vent : " + data.current_condition.wnd_spd + " km/h"
    curr_weather_box.lastChild.id = "info-supp"

    left_box.appendChild(document.createElement("h2")).textContent = data.city_info.name
    left_box.appendChild(curr_weather_box)

    div.appendChild(left_box);
    div.appendChild(right_box);
    doc.data.appendChild(div);
}

function getTodayWeather(data) {

}

/**
 * Initialise events
 */
function init() {
    doc.button.addEventListener('click', function () {
        handleData(doc.text.value)
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleData(doc.text.value)
        }
    });

    initMap();
}

function initMap(){
    var map = L.map('map').setView([46.603354, 1.888334], 6);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: 'CartoDB'
      }).addTo(map);

      map.on('click', function(e){
        let latitude = e.latlng.lat;
        let longitude = e.latlng.lng;
        
        console.log("latitude :" + latitude + " , longitude : " + longitude);
      });
}

init();