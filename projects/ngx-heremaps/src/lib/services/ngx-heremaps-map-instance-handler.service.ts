import {ElementRef, Inject, Injectable} from '@angular/core';

import {NgxHeremapsLoadModulesService} from './ngx-heremaps-load-modules.service';
import {HEREMAPS_OPTIONS} from '../providers/module.provider';
import {NgxHeremapsServicePlatformOptions} from '../interfaces/ngx-heremaps-service-platform.options';
import {Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';


@Injectable()
export class NgxHeremapsMapInstanceHandlerService {

  platform: H.service.Platform;
  defaultLayers: H.service.DefaultLayers;
  map: H.Map;
  behaviour: H.mapevents.Behavior;
  ui: H.ui.UI;
  pixelRatio = window.devicePixelRatio || 1;


  constructor(@Inject(HEREMAPS_OPTIONS) private readonly options: NgxHeremapsServicePlatformOptions,
              private readonly moduleLoader: NgxHeremapsLoadModulesService) {

  }


  protected getBasicDefaultLayerOptions(): H.service.Platform.DefaultLayersOptions {
    return {
      tileSize: this.pixelRatio === 1 ? 256 : 512,
      ppi: this.pixelRatio === 1 ? undefined : 320
    };
  }


  protected getMapDefaultOptions(): H.Map.Options {
    return {
      pixelRatio: this.pixelRatio,
      center: {lat: 51.5135872, lng: 7.4652981},
      zoom: 12
    };
  }


  handle(
    container: ElementRef,
    defaultLayerOptions: H.service.Platform.DefaultLayersOptions = this.getBasicDefaultLayerOptions(),
    mapOptions: H.Map.Options = this.getMapDefaultOptions()
  ): Subject<boolean> {

    const mapReady: Subject<boolean> = new Subject();

    this.moduleLoader.modulesMounted
      .pipe(
        finalize(() => mapReady.complete())
      )
      .subscribe(() => {

          this.platform = new H.service.Platform(this.options);
          this.defaultLayers = this.platform.createDefaultLayers(defaultLayerOptions);
          this.map = new H.Map(container.nativeElement, this.defaultLayers.normal.map, mapOptions);

          if (this.options.modules.includes('mapevents')) {
            this.behaviour = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          }

          if (this.options.modules.includes('ui')) {
            this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers, 'de-DE');
          }

        },
        () => mapReady.next(false),
        () => mapReady.next(true));

    return mapReady;
  }


}
