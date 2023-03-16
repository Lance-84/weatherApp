let lat = 19.07;
let lon = 72.87;
let dir = ["N","NE","E","SE","S","SW","W","NW","N"]
/*
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}
*/

const url = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&timezone=auto&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant";
fetch(url).then((response) => response.json()).then(data => {
  document.getElementById("temp").innerHTML=(parseInt(data.daily.temperature_2m_max[0]) + parseInt(data.daily.temperature_2m_min[0])) /2 + "<sup><sup>o</sup>C</sup>";
  document.getElementById("date").innerHTML = new Date().toString().split(" ").slice(0,4).join(" ");
  document.getElementById("time").innerHTML = new Date().toString().split(" ").slice(4,5);
  document.getElementById("uvindex").innerHTML = data.daily.uv_index_max[0];
  document.getElementById("wind").innerHTML = dir[Math.round(data.daily.winddirection_10m_dominant[0]/45)] +" "+ data.daily.windspeed_10m_max[0]+"km/h";
  document.getElementById("sun").innerHTML = new Date(data.daily.sunrise[0]).toLocaleTimeString()+"/"+new Date(data.daily.sunset[0]).toLocaleTimeString();
});