//Global Variables 
var apiKey = "&units=imperial&appid=f26d01795b1fd24a71924c250027f50c";
var apiKey_Uv = "f26d01795b1fd24a71924c250027f50c";




// get current weather
function getCurrentWeather(userSearch) {
    userSearch = userSearch.toLowerCase();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + apiKey;

    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
               
                
                // save to Local Storage 
                var citiesSaved = JSON.parse(localStorage.getItem("Recent-Cities"));
                if (!citiesSaved) {
                    citiesSaved = [];
                }

                //my object format:
                // var cityObj = {
                //         citySearched: ""
                // };
                var alreadyCity = false;
                citiesSaved.forEach(function(city){
                    var cityName = city.citySearched;
                    if (cityName === userSearch)
                        alreadyCity = true;
                });

                if (!alreadyCity) {
                    //add them to local storage
                    citiesSaved.push({
                        citySearched: userSearch,
                    });
                }
                
                localStorage.setItem("Recent-Cities", JSON.stringify(citiesSaved));

               
                
                displayCurrentWeather(data);
                recentSearches(citiesSaved);
                return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
            })
            .then (function (response) {
                return response.json();
            })
            .then (function (data){
                console.log(data);
                getuvIndex(data);
            })
        }; 
    });
    
    
}



function displayCurrentWeather (search) {

    // get current city 
    var cityName = search.name;
    // console.log(cityName);
    
    // get current country
    var country = search.sys.country;
    // console.log(country);

    // get current temp
    var currentTemp = search.main.temp;
    // console.log(currentTemp);

    // description of weather type
    var weatherDescription = search.weather[0].description.toUpperCase();
    // console.log(weatherDescription);
    
    // description of weather
    var weatherMainDescription = search.weather[0].main.toUpperCase();
    // console.log(weatherMainDescription);

    // get wind speed 
    var currentWindSpeed = search.wind.speed;
    // console.log(currentWindSpeed);
    
    // get humidity
    var humidity = search.main.humidity;
    // console.log(humidity);

    // get current latitude
    var lat = search.coord.lat;
    // console.log(lat);

    // get current longitude
    var lon= search.coord.lon;
    // console.log(lon);
    
 
        // get icon data
    var iconSrc = search.weather[0].icon;   
    // console.log(iconSrc);
    // set icon in a img tag and give its attributes
    var weatherIcon = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + iconSrc + "@2x.png");
    // console.log(weatherIcon);
    weatherIcon.attr("class", "mx-auto d-block img-size");
    weatherIcon.attr("id", "icon");
    //append Icon 
    $('#weatherIcon').append(weatherIcon);

    
    //send text to current Conditions card
    $('#currentConditions').text("Current Conditions: " + weatherDescription);
    var todaysDate = moment().format('MM' + '/'+ 'DD' + '/' + 'YYYY');
    // console.log(todaysDate);
    $('#user-search-result').text(cityName + " (" + todaysDate + ")");
    $('#temp').text("Temp: " + currentTemp + " \u00B0F");
    $('#wind').text("Wind: " + currentWindSpeed + " MPH");
      // $('#humidity').text(humidityIcon);
    $('#humidity').text("Humidity: " + humidity + " %");
   
    

};

// displayCurrentWeather();



//Get UVIndex Color Indicators 
function getuvIndex(userSearch) {
    // UV index
    var uvIndex = userSearch.current.uvi;
    console.log(uvIndex);
    $('#UV-index').html(`UV Index:  <span id="uvColor">${uvIndex}</span>`);
    // UV Index Colors if statement
    if (uvIndex < 3) {
       return  $(uvColor).attr("class", "bg-green");
    } else if (uvIndex >= 3 && uvIndex <= 6) {
       return $(uvColor).attr("class", "bg-yellow"); 
    } else if (uvIndex >= 6 && uvIndex <= 8) {
       return  $(uvColor).attr("class", "bg-orange"); 
    } else if (uvIndex >= 8 && uvIndex < 11) {
      return $(uvColor).attr("class", "bg-red"); 
    } else return $(uvColor).attr("class", "bg-purple"); 

}



/*5 day forecast function*/
function fivedayForecast (userSearch) {
   // clear card to reload the next new card
    $("#castCard").empty();
    // API call for 5 day forcast outline (api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})

    // "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + apiKey;
    
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + apiKey;
     
    fetch (forecastUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){

                displayForecast(data);
                console.log(data);
            });
        }
    });
};




// display the 5 day forecast cards
function displayForecast (search) {
    
    // latitude (city.coord.lat)
    var lat = search.city.coord.lat;
    // console.log(lat);
    // longitude (city.coord.lon)
    var lon= search.city.coord.lon;
    // console.log(lon);

       

    // loop to create a card 
    for (var i = 0; i < search.list.length; i+=8) {
    //    console.log(i);
        var forecastObj ={
            date: search.list[i].dt_txt,
            temp: search.list[i].main.temp,
            wind: search.list[i].wind.speed,
            humidity: search.list[i].main.humidity,
            icon: search.list[i].weather[0].icon,
            description: search.list[i].weather[0].description
        };
        // console.log(forecastObj.icon);
        // console.log(forecastObj.description);

       
        // div for column spacing 
        var forecastRow = $('<div>').attr('class', 'col-md-2');
            // append to 5 day forecast div 
            $('#castCard').append(forecastRow);
        
        // div for card creation
        var forecastCard = $('<div>').attr('class', 'card ');
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
            weatherIcon.attr('class', 'mx-auto d-flex justify-content-center align-items-center');
            // append icon
            $(cardBody).append(weatherIcon);

        // get current weather description for each card
        var weatherDescription = $('<h4>').text(forecastObj.description);
            weatherDescription.attr('class', 'd-flex justify-content-center align-items-center bg-color mb-3');
            // append weather description
            $(cardBody).append(weatherDescription);

         
            
        // add card info of Temp, Wind, Humidity with respective icons
        var cardInfo = $('<div>').attr('class', 'd-flex flex-column d-inline');
            // append to card 
            $(cardBody).append(cardInfo); 

            
        // get tempature for cards
        var tempInfo = $('<div>').attr('class', 'd-flex align-items-center pt-3');
        var currentTemp = $('<h6>').attr('class', 'd-inline-block pl-2 temp').text('Temp: ' + forecastObj.temp + " \u00B0F");
        var tempIcon = $('<i>').attr('class', 'fa-solid fa-temperature-quarter d-inline-block ');
        // var iconTemp = $('<i>').attr('class', 'fa-solid fa-temperature-quarter d-inline-block mx-0');
        // var actualTemp = $ ('<h6>').attr('class', 'pl-2 temp d-inline-block mx-0');
        // actualTemp.text('Temp: ' + forecastObj.temp + " \u00B0F")
        // $(cardInfo).text('<div><i class="fa-solid fa-temperature-quarter d-inline-block mx-0"></i><h6 class="pl-2 temp d-inline-block mx-0 ">Temp: ' + forecastObj.temp + '\u00B0F</h6></div>');
        $(currentTemp).text('Temp: ' + forecastObj.temp + '\u00B0F');
            // append temp
                // $(tempInfo).append(iconTemp);
                // $(tempInfo).append(actualTemp);
                // $(cardInfo).append(tempInfo);
            $(tempInfo).append(tempIcon, currentTemp);
            $(cardInfo).append(tempInfo);
            
            
           
        // get wind for cards 
        var windInfo = $('<div>').attr('class', 'd-flex align-items-center pt-3'); 
        var currentWind = $('<h6>').attr('class', 'd-inline-block pl-2 wind temp').text('Wind: ' + forecastObj.wind + " MPH");
        var windIcon = $('<i>').attr('class', 'fa-solid fa-wind d-inline-block');
        // $(cardInfo).html('<div><i class="fa-solid fa-wind d-inline-block mx-0"></i><h6 class="pl-2 temp d-inline-block mx-0 ">Wind: ' + forecastObj.temp + '\u00B0F</h6></div>');
            // append wind
            $(windInfo).append(windIcon, currentWind);
            $(cardInfo).append(windInfo);
          
        // get humidity for cards  
        var humidInfo = $('<div>').attr('class', 'd-flex align-items-center pt-3'); 
        var currentHumidity = $('<h6>').attr('class', 'd-inline-block pl-2').text('Humidity: ' + forecastObj.humidity + "%");
        var humidityIcon = $('<i>').attr('class', 'fa-solid fa-droplet d-inline-block');
            // append humidity
            $(humidInfo).append(humidityIcon, currentHumidity);
            $(cardInfo).append(humidInfo);
      
    };
};






//most recent searches buttons
function recentSearches () {
    //Get item from LocalStorage checking if there are items there
    var citiesSaved = JSON.parse(localStorage.getItem("Recent-Cities"));
        if (citiesSaved == null){
            return null
        } 

        $('#recent-search').html("");
        // for loop to loop through localStorage and return each item as a buttom with specific styling
    for (var i = 0; i < citiesSaved.length; i++){
        var btn = $("<button>");
        btn.attr('class', "btn btn-click");
        // console.log(btn);
        btn.attr('data-city', citiesSaved[i].citySearched);
        btn.text(citiesSaved[i].citySearched);
        // console.log(btn);
         
        $('#recent-search').append(btn);
        
        
    }

    // allows use to click on search history after a current search is performed.
    $(".btn-click").on('click', function (event) {
        event.preventDefault();
        var cityTarget = event.target.dataset.city;
        // $("data-city")
        getCurrentWeather(cityTarget);
        fivedayForecast(cityTarget);
        //shows the current clicked on recent searched city
        $(".show").removeClass("show");
        //removes the previous search city weather icon and replaces with current searched city
        const weatherIcon = document.getElementById("icon");
        weatherIcon.parentNode.removeChild(weatherIcon);

    });

}




// Search button click
$(".btn").on('click', function (event) {
    //prevents page refresh
    event.preventDefault();

    // if statement to check if string value was inputed into the search bar, if not return weather information
    if ($('#search-input').val() === "") {
        alert("Please enter in a valid City Name!");
    } else {
        var userSearch = $('#search-input').val().trim().toLowerCase();
        console.log(userSearch);
        getCurrentWeather(userSearch);
        fivedayForecast(userSearch);
        // getuvIndex();
        $(".show").removeClass("show");
        $('#search-input').val("");
    }
    
    //removes the previous search city weather icon and replaces with current searched city
    const weatherIcon = document.getElementById("icon");
    weatherIcon.parentNode.removeChild(weatherIcon);
   
    
});


//calling recent searches function
recentSearches();