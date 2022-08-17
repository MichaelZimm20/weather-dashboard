//Global Variables 
var apiKey = "&units=imperial&appid=f26d01795b1fd24a71924c250027f50c";
var apiKey_Uv = "f26d01795b1fd24a71924c250027f50c"




// get current weather
function getCurrentWeather(userSearch) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + apiKey;
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
    // var uvIndexUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily&appid=" + apiKey_Uv;
    // console.log(uvIndexUrl);

    // fetch(uvIndexUrl)
    //     .then(function(response) {
    //         //request was successful
    //         if (response.ok) {
    //             response.json().then(function(data){
    //                 console.log(data);
    //             });
    //         };
    //     });
     
    
    // get icon data
    var iconSrc = search.weather[0].icon;   
    console.log(iconSrc);
    // set icon in a img tag and give its attributes
    $('#empty').empty();
    var weatherIcon = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + iconSrc + "@2x.png");
    console.log(weatherIcon);
    weatherIcon.attr("class", "mx-auto d-block img-size");
    weatherIcon.attr("id", "icon");
    //append Icon 
    $('#weatherIcon').append(weatherIcon);
    
    //send text to current Conditions card
    $('#currentConditions').text("Current Conditions: " + weatherDescription);
    var todaysDate = moment().format('MM' + '/'+ 'DD' + '/' + 'YYYY');
    console.log(todaysDate);
    $('#user-search-result').text(cityName + " (" + todaysDate + ")");
    $('#temp').text("Temp: " + currentTemp + " \u00B0F");
    $('#wind').text("Wind: " + currentWindSpeed + " MPH");
    $('#humidity').text("Humidity: " + humidity + " %");
    /*Find uv index API and link it*/
    $('#UV-index').text("UV Index: " );
    

};






/*5 day forecast function*/
function fivedayForecast (userSearch) {
    // API call for 5 day forcast outline (api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})

    
    
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + "charlotte" + apiKey;
    console.log(forecastUrl);
    
    fetch(forecastUrl)
    .then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                // displayCurrentWeather(data);
                displayForecast(data);
            });
        };
        
    }); 
};

fivedayForecast();

function displayForecast (search) {
    
    // latitude (city.coord.lat)
    var lat = search.city.coord.lat;
    console.log(lat);
    // longitude (city.coord.lon)
    var lon= search.city.coord.lon;
    console.log(lon);

    
   
    // adding h2 for 5-Day forecast Title
    // var fiveDay = $('<h2>').attr('class', 'forecastStyle').text('5-Day Forecast: ');
    // $('#forecast').append(fiveDay);
    

    // loop to create a card 
    for (var i = 0; i < search.list.length; i+=8) {
       console.log(i);
        var forecastObj ={
            date: search.list[i].dt_txt,
            temp: search.list[i].main.temp,
            wind: search.list[i].wind.speed,
            humidity: search.list[i].main.humidity,
            icon: search.list[i].weather[0].icon,
            description: search.list[i].weather[0].description
        };
        console.log(forecastObj.icon);
        console.log(forecastObj.description);

       
        // div for column spacing 
        var forecastRow = $('<div>').attr('class', 'col-md-2');
            // append to 5 day forecast div 
            $('#castCard').append(forecastRow);
        
        // div for card creation
        var forecastCard = $('<div>').attr('class', 'card');
            // append to 5 day forecast row
            $(forecastRow).append(forecastCard);
        
        // card body div
        var cardBody  = $('<div>').attr('class', 'card-body');
            // append to card 
            $(forecastCard).append(cardBody);

        // adding cardbody elements START
        // card body date
        var cardDate = $('<h4>').attr('class', 'card-title card-header d-flex justify-content-center align-items-center').text(moment(forecastObj.date).format('MM' + '/'+ 'DD' + '/' + 'YYYY'));
            // append to card 
            $(cardBody).append(cardDate);

        // get current weather status icon for each card
        var weatherIcon = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + forecastObj.icon + "@2x.png");
            weatherIcon.attr('class', 'px-5 align-items-center');
            // append icon
            $(cardBody).append(weatherIcon);
        var weatherDescription = $('<h4>').text(forecastObj.description);
            weatherDescription.attr('class', 'd-flex justify-content-center align-items-center bg-color');
            // append weather description
            $(cardBody).append(weatherDescription);






        // div for row class and 
           

    };
};




























// Search button click
$(".btn").on('click',function(event){
    event.preventDefault();
    
    if($('#search-input').val() === ""){
        alert("Please enter in a valid City Name!");
    } else {
        var userSearch = $('#search-input').val().trim().toLowerCase();
            getCurrentWeather(userSearch);
            $(".show").removeClass("show");
            $('#search-input').val("");
            // $('#icon').removeclass("d-block");
    }

});

