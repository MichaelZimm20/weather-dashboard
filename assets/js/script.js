//Global Variables 
var apiKey = "&units=imperial&appid=f26d01795b1fd24a71924c250027f50c";
var apiKey_Uv = "f26d01795b1fd24a71924c250027f50c"




// get current weather
function getCurrentWeather(userSearch) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "Charlotte" + apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayCurrentWeather(data);
                // displayCurrentWeather(data);
            });
        };
        
    });
    
    
}

getCurrentWeather();
function displayCurrentWeather (search) {
    var cityName = search.name;
    console.log(cityName);

    var country = search.sys.country;
    console.log(country);

    var currentTemp = search.main.temp;
    console.log(currentTemp);

    // description of weather type
    var weatherDescription = search.weather[0].description.toUpperCase();
    console.log(weatherDescription);
    // description of weather
    var weatherMainDescription = search.weather[0].main.toUpperCase();
    console.log(weatherMainDescription);

    var currentWindSpeed = search.wind.speed;
    console.log(currentWindSpeed);

    var humidity = search.main.humidity;
    console.log(humidity);


    var lat = search.coord.lat;
    console.log(lat);

    var lon= search.coord.lon;
    console.log(lon);
    /*TODO: Add UV Index*/
    var uvIndexUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily&appid=" + apiKey_Uv;
    console.log(uvIndexUrl);

    fetch(uvIndexUrl)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data);
                });
            };
        });
        
    var todaysDate = moment().format('MM' + '/'+ 'DD' + '/' + 'YYYY');
    console.log(todaysDate);
    $('#user-search-result').text(cityName + " (" + todaysDate + ")");
    $('#temp').text("Temp: " + currentTemp + " \u00B0F");
    $('#wind').text("Wind: " + currentWindSpeed + " MPH");
    $('#humidity').text("Humidity: " + humidity + " %");
    /*Find uv index API and link it*/
    $('#UV-index').text("UV Index: " );
    

};



// Search button click
$(".btn").on('click',function(event){
    event.preventDefault();
    var userPickedCity = event.target.getAttribute("data-language");

});
