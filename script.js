for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
}
var count = 0;

        
var searchButton = $(".searchBtn");
var apiKey = "53a56d11c4ac602b4ee4f4122173e8cd";

searchButton.click(function() {
    var searchInput = $(".searchInput").val();
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    
    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function(response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            var local = localStorage.setItem(count, response.name);
            count = count + 1;
    
        }).then(function(response) {
            var day = [0, 8, 16, 24, 64];
            var weatherEl = $(".weatherEl").addClass("card-text");
            
            day.forEach(function(i) {
                var time1 = new Date(response.list[i].dt * 1000);
                time1 = time1.toLocaleDateString("en-US");
                // Setting images and content for forecast
                weatherEl.append("<div class=fiveDayColor>" + "<p>" + timeUTC1 + "</p>" + 
                `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + 
                response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })

        });
    }
});