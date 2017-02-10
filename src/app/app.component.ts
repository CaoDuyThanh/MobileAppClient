import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    templateUrl: 'app.component.html'
})

export class MyApp {
    @ViewChild(Nav) private nav: Nav;

    constructor(private platform: Platform,
                private menu: MenuController) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
