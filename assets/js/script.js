//Global Variables 
var apiKey = "&units=imperial&appid=f26d01795b1fd24a71924c250027f50c";




// get current weather
function getCurrentWeather(userSearch) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "Charlotte" + apiKey;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayCurrentWeather(data);
                // displayCurrentWeather(data);
            });
        }
        
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

    var currentWindSpeed = search.wind.speed;
    console.log(currentWindSpeed);

    var humidity = search.main.humidity;
    console.log(humidity);

    var uvIndexUrl;
};



// Search button click
$(".btn").on('click',function(event){
    event.preventDefault();
    var userPickedCity = event.target.getAttribute("data-language");

});
