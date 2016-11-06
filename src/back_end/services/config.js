//вважаю що data містить назву сервісу і місто
// в darkSky потрібно вводити не назву міста а його координати
module.exports = function(data){
    var city;
    var url;

    var config = {
        openWeather: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',ua&APPID=3e78ad2536ed323a1c1e68f8512485b0',
        wunderground: 'http://api.wunderground.com/api/3a12f2714ca1b6e2/conditions/q/UA/' + city + '.json',
        darkSky: 'https://api.darksky.net/forecast/73ca2db6aa635b831a24746659e7c907/' + city
    };

    if(data.url === config.openWeather){
        url = config.openWeather;
        city = data.city;
    }
    else if(data.url === city.wunderground){
        url = config.wunderground;
        city = data.city;
    }
    else if(data.url === config.darkSky){
        if(data.city === "Rivne"){
            city = "50.6199, 26.2516"
        }
        else  if(data.city === "Lviv"){
            city = "49.8397, 24.0297";
        }
        else if(data.city === "Lutsk"){
            city = "50.7472, 25.3254"
        }
        url = config.darkSky;
    }


    return {
        url: url
    };
};
