import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
// import { ItemDetailsPage } from '../pages/item-details/item-details';
// import { ListPage } from '../pages/list/list';

// Import shared modules
import { TypeaheadModule } from '../shared/shared-module/typeahead.module';

// Import modules
import { MapModule } from '../map/map.module';

// Import components
import { MapComponent } from '../map/map.component';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        TypeaheadModule,
        MapModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [
        IonicApp
    ],
    entryComponents: [
        MyApp,
        MapComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {}
