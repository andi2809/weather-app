const apiKey = "fdd276c9cff16ff448eb8821605de41f";
// let city = "  braga";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&units=metric&q=`;

// lebih mudah. Namun tidak memiliki error handling
// async function getWeather() {
// 	const response = await fetch(apiUrl);
// 	let data = await response.json();
// 	console.log(data);
// }

// lebih kompleks. Namun memiliki error handling
const inputSearch = document.querySelector(".input-search");
const inputBtn = document.querySelector(".icon-search");
const _getWeather = async (city) => {
	try {
		const response = await fetch(apiUrl + city);
		if (!response.ok) {
			throw new Error("Error when fetching data");
		}
		const data = await response.json();
		// console.log(data);
		const degree = Math.round(data.main.temp);
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".degree").innerHTML = degree;
		document.querySelector(".text-humidity").innerHTML =
			data.main.humidity + "%";
		document.querySelector(".text-wind").innerHTML =
			Math.round(data.wind.speed) + "km/h";
		document.querySelector(
			".icon-weather"
		).src = `images/${data.weather[0].main}.png`;
		document.querySelector(".error").style.display = "none";
		document.querySelector(".weather").style.display = "block";
	} catch (error) {
		// console.log(error);
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	}
};

inputBtn.addEventListener("click", () => {
	_getWeather(inputSearch.value);
});
inputSearch.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		_getWeather(inputSearch.value);
	}
});
