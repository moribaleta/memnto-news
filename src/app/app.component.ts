import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsService } from '../pages/services/NewsService';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherService } from '../pages/services/WeatherService';
@Component({
    templateUrl: 'app.html',
    providers: [NewsService,WeatherService],    
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

     rootPage: any = HomePage;

     pages: Array<{title: string, component: any}>;
     sources: Array<any>;
     weather: Array<any>;
     /*lat: number =0;
     long: number =0;
*/
     constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private newsService:NewsService, private geolocation: Geolocation,private weatherService: WeatherService ) {
         this.initializeApp();

         // used for an example of ngFor and navigation
         this.pages = [
             { title: 'Home', component: HomePage }       
         ];
         this.openSources();
         this.getLocation();
     }

     category= [];    
     getLocation(){

         this.geolocation.getCurrentPosition().then((resp) => {            
             /*location['long']= resp.coords.longitude;
             location['lat']= resp.coords.latitude;
             this.loc = location;*/
             //this.loc = resp.coords;
             console.log('locations %o',resp.coords);
             try{
                 //var coords = resp.coords;
                 var lat = resp.coords.latitude;
                 var long = resp.coords.longitude;
                 this.getLocationKey(lat,long);
             }catch(err){

             }
         }).catch((error) => {
             console.log('Error getting location', error);
         });
     }

     getLocationKey(lat,long){
         this.weatherService.getLocationKey(lat,long).subscribe(
             data=>{
                 var result = data.Key;
                 this.getWeather(result);
                 console.log('location key %o',result);
             },
             err=>{

             }
         );
     }

     getWeather(Key){
         this.weatherService.getWeather(Key).subscribe(
             data=>{
                 var result = data.Headline;
                 this.weather = result;
                 console.log('weather %o',this.weather);
             },
             err=>{

             }
         );
     }


     openSources(){
         this.newsService.openSources().subscribe(
             data=>{
                 var result = data;
                 var sources = result.sources;
                 this.sources = sources;
                 for(var i=0; i<sources.length; i++){
                     var source = sources[i];
                     if(this.category.indexOf(source.category)==-1){
                         var cat = source.category;
                         //cat = cat.replace('/-/g',' ');
                         cat = cat.split('-').join(' ');
                         this.category.push(cat);
                     }
                 }
                 this.category.pop();
                 //console.log('sources %o',source_category);
                 //this.source_category = source_category;
             },
             err=>{
                 console.log(err);
             }            
         )         

     }
     openSubcat(subcat){
         subcat = subcat.split(' ').join('-');
         this.nav.push(ListPage,{'source':subcat,'items':this.sources});
     }



     initializeApp() {
         this.platform.ready().then(() => {
             // Okay, so the platform is ready and our plugins are available.
             // Here you can do any higher level native things you might need.
             this.statusBar.styleDefault();
             this.splashScreen.hide();
         });
     }

     openPage(page) {
         // Reset the content nav to have just this page
         // we wouldn't want the back button to show in this scenario
         this.nav.setRoot(page.component);
     }
    }
