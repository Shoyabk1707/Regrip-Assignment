$(document).ready(function() {
    const apiKey = "14d049b8ba65b761b2ba7498caea4860";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = $(".search input");
    const searchBtn = $(".search button");
    const weatherIcon = $(".weather-icon");
    const resultBox = $(".result-box");
    const errorBox = $(".error");

    async function checkWeather(city) {
        if (!city) {
            errorBox.show().text("Please enter a city name.");
            return;
        }

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            errorBox.show().text("City not found. Please try again.");
            resultBox.hide();
            return;
        }

        // Update UI with weather data
        $(".city").html(`<i class="fa-solid fa-location-dot"></i> ${data.name}`);
        $(".temp").html(Math.round(data.main.temp) + "°C");
        $(".humidity").html(data.main.humidity + "%");
        $(".wind").html(data.wind.speed + " km/h");

        // Set weather icon based on conditions
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.attr("src", "Images/clouds.png");
                break;
            case "Clear":
                weatherIcon.attr("src", "Images/clear.png");
                break;
            case "Rain":
                weatherIcon.attr("src", "Images/rain.png");
                break;
            case "Drizzle":
                weatherIcon.attr("src", "Images/drizzle.png");
                break;
            case "Mist":
                weatherIcon.attr("src", "Images/mist.png");
                break;
            case "Snow":
                weatherIcon.attr("src", "Images/snow.png");
                break;
            default:
                weatherIcon.attr("src", "Images/default.png"); // Fallback icon
        }

        console.log(data.weather[0].main );
        // Show results and hide error
        resultBox.show();
        errorBox.hide();
    }

    searchBtn.on("click", function() {
        checkWeather(searchBox.val());
    });

    searchBox.on("keypress", function(event) {
        if (event.key === "Enter") {
            checkWeather(searchBox.val());
        }
    });

    // Hide result box and error initially
    resultBox.hide();
    errorBox.hide();
});
