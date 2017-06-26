import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {NewsService} from '../services/NewsService';
import {ArticlesPage} from '../articles/articles'
@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
    providers: [NewsService]
})
export class ListPage {

    sources: Array<any>;
    articles: Array<any>;
    subcategory:null;
icon: null;    

constructor(public navCtrl: NavController, public navParams: NavParams, private newsService:NewsService, public loading: LoadingController) {

    var item = navParams.get('source');

    var sources = navParams.get('items');
    console.log('sources %o',sources);
    var temp_source = [];
    for(var key in sources){
        //console.log(sources[key].category +'==>'+ item)
        if(sources[key].category == item){
            temp_source.push(sources[key]);
        }
    }
    this.sources = temp_source;


    var sub = item;
    sub = sub.split('-').join(' ');

    var icons = {
        /*business: "<ion-icon ios='ios-analytics' md='md-analytics'></ion-icon>", 
        entertainment:" <ion-icon name='play'></ion-icon>", 
        gaming:"<ion-icon name='game-controller-a'></ion-icon>", 
        general:"<ion-icon name='calendar'></ion-icon>", 
        music:"<ion-icon name='musical-notes'></ion-icon>", 
        politics:"<ion-icon name='barcode'></ion-icon>", 
        scienceandnature:"<ion-icon name='flask'></ion-icon>", 
        sport:"<ion-icon name='baseball'></ion-icon>", 
        technology:"<ion-icon name='baseball'></ion-icon>"*/
        business: "analytics", 
        entertainment:"play", 
        gaming:"game-controller-a", 
        general:"calendar", 
        music:"musical-notes", 
        politics:"barcode", 
        scienceandnature:"flask", 
        sport:"baseball", 
        technology:"bulb"
    }
    var nav = sub.split(' ').join('');
    this.icon = icons[nav];
    sub = "  "+sub;
    this.subcategory = sub;

    //this.openSource(item);
    this.getTopArticles();
}



openSource(item){
    let loading = this.loading.create({
        content: 'gathering sources...'
    });
    loading.present();
    this.newsService.openSourcesCat(item).subscribe(
        data=>{
            var result = data;
            this.sources = data.sources;
            this.getTopArticles();
            loading.dismiss();
        },
        err=>{
            console.log(err);
            loading.dismiss();
        }            
    )
}

selectSource(source_id){                
    //alert(source.id);
    this.navCtrl.push(ArticlesPage,{source:source_id});
}

getTopArticles(){
    var articles = [];
    /*    for(var i=0; i<this.sources.length; i++){
        var id = this.sources[i].id;
        this.newsService.getArticles(id).subscribe(
            data=>{                
                //articles.push(data.articles);
                for(var j=0; j<1; j++){ 
                    var article = data.articles[j];
                    article['source'] = data.source;
                    articles.push(data.articles[j]);
                }
                //console.log('sources %o',data);    
                this.articles = articles;
                console.log('articles %o',this.articles);
            },
            err=>{
                console.log(err);
            }            

        )
    }*/

    for(var key in this.sources){
        var id = this.sources[key].id;
        this.newsService.getArticles(id).subscribe(
            data=>{                
                //articles.push(data.articles);
                for(var j=0; j<1; j++){ 
                    var article = data.articles[j];
                    article['source'] = data.source;
                    articles.push(data.articles[j]);
                }
                //console.log('sources %o',data);    
                this.articles = articles;
                console.log('articles %o',this.articles);
            },
            err=>{
                console.log(err);
            }            

        )
    }

}


}
