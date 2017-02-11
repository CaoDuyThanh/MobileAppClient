import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as $ from 'jquery';

// Load Map config
import { MapConfig } from './map.config';

// // Import models
// import { TrafficPole } from '../service/models/CameraModel';

// Import services
// import { CameraService } from '../service/camera-service';
import { StreetService } from '../service/street-service';
import { DensityService } from '../service/density-service';

// Import utils
import { DensityMapHelper } from '../utils/map.helper';

declare let L: any;

@Component({
	selector: 'map-cmp',
	templateUrl: 'map.component.html'
})

export class MapComponent implements AfterViewInit, OnDestroy {
	private NUM_ITEMS: number = 5;

	@ViewChild('searchdiv') private searchDiv: ElementRef;

	private isLoadMap = false;
	// private trafficPoles: TrafficPole[] = [];
	// private selectedTrafficPole: TrafficPole = new TrafficPole();
	// private selectedTrafficPoleListener: Observer<any>;

	// Map Elements
	private mymap: any;
	private rasterLayer: any;
	private legendLayer: any;
	private densityMap: DensityMapHelper;

	// Search component
	private searchStr: string = '';
	private selectedSearch: any = '';
	private suggestSearch: any[] = [];

	// Timer
	private timer: any;

	constructor(// private cameraService: CameraService,
				private streetService: StreetService,
				private densityService: DensityService,
				private elementRef: ElementRef
				) {
		// Timer
		this.timer = null;
	}

	ngAfterViewInit() {
		this.createSearchEvent();
		this.isLoadMap = true;
		this.loadMap();
			// this.loadCamera();
	}

	// // LOAD MAP (START) ----------------------------------------

	createRasterLayer(): void {
		this.mymap = L.map('main_map');
		var rasterOption = {
			minZoom: MapConfig.MIN_ZOOM,
			maxZoom: MapConfig.MAX_ZOOM,
			id: MapConfig.MAPID
		};
		this.rasterLayer = L.tileLayer(MapConfig.RASTER_URL, rasterOption);
		this.rasterLayer.addTo(this.mymap);
	}

	createDensityLayer(): void {
		this.densityMap = new DensityMapHelper(this.densityService, this.mymap);
		this.mymap.on('moveend', (event: any) => {
		   	var bounds = this.mymap.getBounds();
		   	var zoom = this.mymap.getZoom();

		   	var newBounds = {
		   		lat_start: bounds._southWest.lat,
		   		lon_start: bounds._southWest.lng,
		   		lat_end: bounds._northEast.lat,
		   		lon_end: bounds._northEast.lng
		   	};
		   	this.densityMap.Update(zoom, newBounds, L);
		});

		if (this.timer) {
			this.timer.unsubscribe();
		}
		var observable = Observable.timer(0, +MapConfig.RELOAD_DENSITY);
        this.timer = observable.subscribe(() => {
            var bounds = this.mymap.getBounds();
		   	var zoom = this.mymap.getZoom();

		   	var newBounds = {
		   		lat_start: bounds._southWest.lat,
		   		lon_start: bounds._southWest.lng,
		   		lat_end: bounds._northEast.lat,
		   		lon_end: bounds._northEast.lng
		   	};
		   	this.densityMap.Update(zoom, newBounds, L);
        });
	}

	disableZoom(): void {
		this.mymap.removeControl(this.mymap.zoomControl);
	}

	loadMap(): void {
		this.createRasterLayer();
		this.createDensityLayer();
		this.disableZoom();

		// Start map
		this.mymap.setView(MapConfig.DEFAULT_VIEW, MapConfig.DEFAULT_ZOOM);
	}
	// LOAD MAP (END) ------------------------------------------

	// addTrafficPolesMarker(): void {
	// 	var iconOptions = L.icon({
	// 		iconUrl: '<%= JS_SRC %>/images/camera.svg',
	// 		iconSize: [60, 150],
	// 		iconAnchor: [30, 150],
	// 		popupAnchor: [-3, -76]
	// 	});

	// 	this.trafficPoles.forEach((trafficPole: TrafficPole) => {
	// 		var marker = L.marker([trafficPole.Lat, trafficPole.Lon], { icon: iconOptions })
	// 			.on('click', () => {
	// 				this.selectedTrafficPole = trafficPole;
	// 				this.selectedTrafficPoleListener.next('change');

	// 				var trafficPoleModal: any = $('#ShowTrafficPoleBtn');
	// 				trafficPoleModal.click();
	// 			});


	// 		marker.addTo(this.mymap);
	// 	});
	// }

	// loadCamera(): void {
	// 	(this.cameraService.GetAllTrafficPoles())
	// 		.subscribe(
	// 		(results: TrafficPole[]) => {
	// 			this.trafficPoles = results;
	// 			this.addTrafficPolesMarker();
	// 		},
	// 		(err: any) => {
	// 			console.log(err);
	// 		}
	// 		);
	// }

	// SelectTrafficPole(trafficPole: TrafficPole): void {
	// 	this.mymap.panTo(L.latLng(trafficPole.Lat, trafficPole.Lon));
	// }

	ClickSearch(): void {
		var searchDiv: any = $('#search_cmp' + ' .typeahead-input');
		this.searchStr = searchDiv.val();
		(this.streetService.GetLocation(this.searchStr))
			.subscribe(
			(result: any) => {
				this.mymap.panTo(L.latLng(result.lat, result.lon));
			},
			(err: any) => {
				console.log(err);
			}
			);
	}

	// SEARCH FUNCTION (START) ----------------------
	suggestSearchSelected(suggestSearch: any) {
		this.searchStr = suggestSearch ? suggestSearch.name : 'none';
	}

	createSearchEvent(): void {
		// Create suggest search event
		// var $searchDiv:any = $('.typeahead .typeahead-input');
		Observable.fromEvent(this.searchDiv.nativeElement, 'keyup')
			.map((e: any) => e.target.value)
			.filter((text: string) => text.length > 1)
			.debounceTime(50)
			.map((query: string) => this.streetService.SearchName(query, this.NUM_ITEMS))
			.switch()
			.subscribe(
			(results: any) => {
				console.log(results);
				this.suggestSearch = results.map((result: any) => {
					return {
						name: result,
						searchText: result
					};
				});
			},
			(err: any) => {
				console.log(err);
			}
			);
	}
	// SEARCH FUNCTION (END) -------------------------

	ngOnDestroy() {
		if (this.timer) {
			this.timer.unsubscribe();
		}
	}
}
