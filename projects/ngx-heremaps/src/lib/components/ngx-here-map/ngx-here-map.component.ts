import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {NgxHeremapsMapInstanceHandlerService} from '../../services/ngx-heremaps-map-instance-handler.service';


@Component({
  selector: 'ngx-heremaps-map',
  templateUrl: './ngx-here-map.component.html',
  styleUrls: ['./ngx-here-map.component.scss'],
  providers: [
    NgxHeremapsMapInstanceHandlerService
  ]
})
export class NgxHereMapComponent implements AfterViewInit {

  @ViewChild('heremap', {static: true}) mapContainer: ElementRef;

  @Input() defaultLayersOptions?: H.service.Platform.DefaultLayersOptions;
  @Input() mapOptions?: H.Map.Options;

  @Output() mapReady: EventEmitter<boolean> = new EventEmitter();


  get map(): H.Map {
    return this.mapInstance.map;
  }


  constructor(public readonly mapInstance: NgxHeremapsMapInstanceHandlerService) {
  }


  ngAfterViewInit(): void {
    this.mapInstance.handle(this.mapContainer, this.defaultLayersOptions, this.mapOptions)
      .subscribe((ready) => {
          this.mapReady.emit(ready);
        }
      );
  }


}
