import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';

// Import shared modules
import { TypeaheadModule } from '../shared/shared-module/typeahead.module';

// Import components
// import { TrafficPoleModalComponent } from './sub-component/traffic-pole-modal.component';

// Import service
import { CameraService } from '../service/camera-service';
import { StreetService } from '../service/street-service';
import { DensityService } from '../service/density-service';

@NgModule({
    imports: [
    	BrowserModule,
        FormsModule,
        TypeaheadModule
	],
    declarations: [
    	MapComponent,
    	// TrafficPoleModalComponent,
	],
    exports: [MapComponent],
    providers: [CameraService,
                StreetService,
                DensityService]
})

export class MapModule { }
