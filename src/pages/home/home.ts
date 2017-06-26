

import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {NewsService} from '../services/NewsService';
import {ArticlesPage} from '../articles/articles';
import {StoryPage} from '../story/story';
import { LoadingController,AlertController } from 'ionic-angular';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [NewsService]
})
export class HomePage {

    constructor(public navCtrl: NavController, private newsService: NewsService, public loading: LoadingController,public alertCtr: AlertController) {
        this.openSources();
    }
    sources: Array<any>;    
    articles : Array<any>;

    openSources(){

        let loading = this.loading.create({
            content: 'gathering sources...'
        });
        loading.present();
        this.newsService.openSources().subscribe(
            data=>{
                var result = data;
                this.sources = data.sources;
                //console.log('sources %o',data);        
                loading.dismiss();
                this.getTopArticles();
            },
            err=>{
                console.log(err);
                loading.dismiss();
                let alert = this.alertCtr.create({
                    title: 'network error',
                    subTitle: 'could not get sources from server',
                    buttons: ['Dismiss']
                });
                alert.present();
            }            
            

        )
        /*  this.newsService.openSources().subscribe(
            data=>{
                var result = data;
                this.sources = data.sources;
                //console.log('sources %o',data);        
                loading.dismiss();
            },
            err=>{
                console.log(err);
                loading.dismiss();
            }            

        )
*/
    }

//articles_temp = [];



getTopArticles(){
    var articles = [];
    for(var i=0; i<10; i++){
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
    }

}


selectSourceBadge(source_id){
    for(var i = 0; i<this.sources.length; i++){
        if(source_id == this.sources[i].id){
            this.selectSource(this.sources[i]);
            return;
        }
    }
}

selectSource(source_id){                
    //alert(source.id);
    this.navCtrl.push(ArticlesPage,{source:source_id});
}

openStory(item){
    this.navCtrl.push(StoryPage,{story:item});
}


search(){
    
}


}