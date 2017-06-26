import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class NewsService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    openSources() {
        var url = 'https://newsapi.org/v1/sources?language=en';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
    getArticles(id){
        var url = 'https://newsapi.org/v1/articles?source='+id+'&apiKey=c0116267d97147c4bb467508c813199a';
        var response =this.http.get(url).map(res => res.json());
        return response;
    }
    
    openSourcesCat(cat){
        var url = 'https://newsapi.org/v1/sources?language=en&category='+cat;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}