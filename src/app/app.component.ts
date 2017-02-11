import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Import components
import { MapComponent } from '../map/map.component';

@Component({
    templateUrl: 'app.component.html'
})

export class MyApp {
    // Content child
    @ViewChild(Nav) private appContent: Nav;

    // Pages
    private rootPage: any;

    constructor(private platform: Platform,
                private menu: MenuController) {
        this.initializeApp();
        this.rootPage = MapComponent;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
