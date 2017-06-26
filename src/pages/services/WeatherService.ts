import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class WeatherService{      

    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }
    

    /*for accuweather*/
    getLocationKey(lat,long){
        var url_path = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=o7xp01zqGF9AqsnBF5BfwDgnsJoQmcKG&q="+lat+"%2C"+long;                
        return this.http.get(url_path).map(res => res.json());        
    }

    getWeather(key){
        var url_path = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/"+key+"?apikey=o7xp01zqGF9AqsnBF5BfwDgnsJoQmcKG";
        /*$.ajax({
            url: url_path,
            success: function(response){

                var weather = "weather: <span class='desktop'>"+response.Headline.Text+"</span>";
                weather += "<span class='mobile'>"+response.Headline.Category+"</span>";

                forecast_detail.innerHTML = weather;
            }
        })*/        
        return this.http.get(url_path).map(res => res.json());
        
    }
}