import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
/**
* Generated class for the StoryPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-story',
    templateUrl: 'story.html',
})
export class StoryPage {
    id: 'iframe';
url: SafeResourceUrl;
story: null;
class_: boolean = false;
open_html:boolean = false;

constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,sanitizer:DomSanitizer) {
    var source = this.navParams.get('story'); 
    console.log('story %o',source);
    this.story = source;
    this.url = sanitizer.bypassSecurityTrustResourceUrl(source.url);

    platform.ready().then(() => { 


        platform.registerBackButtonAction(() => {
            this.back();
        });

    }
                         );
}

openHtml(){
    this.open_html = true;
}

ionViewDidLoad() {
    console.log('ionViewDidLoad StoryPage');
}

back(){    
    if(!this.open_html){
        this.class_ = true;
        var nav = this.navCtrl;
        setTimeout(function(){
            nav.pop();   
        },550);
    }else{
        this.open_html = false;
    }

}


}
