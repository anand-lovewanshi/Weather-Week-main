function GetInfo() {
  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = newName.value;

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newName.value +
      "&appid=f331861448e91b0a084ad6d61b79c384"
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 7; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          "Min: " +
          Number(data.list[i].main.temp_min - 273.15).toFixed(1) +
          "°";
      }

      for (i = 0; i < 7; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          "Max: " +
          Number(data.list[i].main.temp_max - 273.15).toFixed(2) +
          "°";
      }

      for (i = 0; i < 7; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }

      console.log(data);
    })

    .catch((err) =>
      alert("Something Went Wrong: Try Checking Your Internet Coneciton")
    );
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Noida";
  GetInfo();
}

var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 7; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
