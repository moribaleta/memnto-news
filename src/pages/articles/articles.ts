import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import {NewsService} from '../services/NewsService';
import {StoryPage} from '../story/story';
/**
 * Generated class for the ArticlesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-articles',
    templateUrl: 'articles.html',
    providers: [NewsService]
})
export class ArticlesPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private newsService: NewsService, private loading: LoadingController, private alertCtr: AlertController) {
        this.getArticles();
    }

    articles : Array<any>;
    source: null;

getArticles(){

    let loading = this.loading.create({
        content: 'Please wait...'
    });
    loading.present();
    var data = this.navParams.get('source'); 
    this.source = data;
    this.newsService.getArticles(data.id).subscribe(
        data=>{
            var result = data;
            this.articles = data.articles;
            console.log('sources %o',data);
            loading.dismiss();
        },
        err=>{
            console.log(err);
            loading.dismiss();
            let alert = this.alertCtr.create({
                title: 'network error',
                subTitle: 'could not get sources from server',
                buttons: [{
                    text: 'go back',
                    handler: ()=>{
                        this.navCtrl.pop();
                    }
                }]
            });
            alert.present();                        
        }            
    )
}    

openStory(item){
    this.navCtrl.push(StoryPage,{story:item});
}

ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
}



}
