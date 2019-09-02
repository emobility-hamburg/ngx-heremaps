import {ModuleWithProviders, NgModule} from '@angular/core';

import {HEREMAPS_OPTIONS} from './providers/module.provider';
import {NgxHereMapComponent} from './components/ngx-here-map/ngx-here-map.component';
import {NgxHeremapsServicePlatformOptions} from './interfaces/ngx-heremaps-service-platform.options';
import {NgxHeremapsLoadModulesService} from './services/ngx-heremaps-load-modules.service';


@NgModule({
  declarations: [
    NgxHereMapComponent
  ],
  imports: [],
  exports: [
    NgxHereMapComponent
  ]
})
export class NgxHeremapsModule {


  static withOptions(platformOptions: NgxHeremapsServicePlatformOptions): ModuleWithProviders {
    return {
      ngModule: NgxHeremapsModule,
      providers: [
        {
          provide: HEREMAPS_OPTIONS,
          useValue: platformOptions
        },
        NgxHeremapsLoadModulesService
      ]
    };
  }
}
