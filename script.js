const cities = {
  2643743: "London",
  5128581: "New York",
  498817: "Saint-Petersburg",
  703448: "Kyiv",
  524894: "Moscow",
  625144: "Minsk",
  2174003: "Brisbane",
  1261481: "New Delhi",
}
const param = {
  "url": "https://api.openweathermap.org/data/2.5/",
  "appid": "fa9a28acfc673e4e989ff8d256d5ed50"
}

let select = document.createElement('select');
document.querySelector('.dropdown').after(select);
select.setAttribute('id', 'city');
select.setAttribute('class', 'dropdown');
select.setAttribute('name', 'dropdown');
let city = document.querySelector('#city');

for (key in cities) {
  let option = document.createElement('option');
  option.setAttribute('value', `${key}`);
  option.textContent = `${cities[key]}`;
  document.querySelector('#city').append(option);
}

function getWeather() {
  fetch(`${param.url}weather?id=${city.value}&appid=${param.appid}`)
    .then(function (resp) { return resp.json() })
    .then(showWeather)
    .catch(function () {
      console.log('error')
    });
}

function showWeather(data) {
  let wd = data.wind.deg, out_wd = '';
  if ((wd >= 0) && (wd < 90)) {
    out_wd = 'north east';
  } else if ((wd >= 90) && (wd < 180)) {
    out_wd = 'south east';
  } else if ((wd >= 180) && (wd < 270)) {
    out_wd = 'south west';
  } else if ((wd >= 270) && (wd < 360)) {
    out_wd = 'north west';
  }
  document.querySelector('.city').textContent = data.name;
  document.querySelector('.descr').innerHTML = data.weather[0]['main'];
  document.querySelector('.current-temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
  document.querySelector('.humidity').innerHTML = `${data.main.humidity} %`;
  document.querySelector('.pressure').innerHTML = `${data.main.pressure - 253} mm`;
  document.querySelector('.wind_speed').innerHTML = `${data.wind.speed} m/s`;
  document.querySelector('.wind_direction').innerHTML = out_wd;
  document.querySelector('.img').innerHTML = `<img class="card-img" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;
}
city.onchange = getWeather;
getWeather();
