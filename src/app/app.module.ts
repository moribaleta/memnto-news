import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ArticlesPage} from '../pages/articles/articles';
import { ListPage } from '../pages/list/list';
import { StoryPage } from '../pages/story/story';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        ArticlesPage,
        StoryPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicPageModule.forChild(ArticlesPage),
        IonicPageModule.forChild(StoryPage),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        ArticlesPage,
        StoryPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
