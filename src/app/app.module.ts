import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {NgxHeremapsModule, NgxHeremapsServicePlatformOptions} from '@stromnetz-hamburg/ngx-heremaps';


const hereMapsOptions: NgxHeremapsServicePlatformOptions = {
  app_id: '12345678910',
  app_code: '777666555444333',
  modules: ['core', 'service', 'ui'],
  modulesRessourcePath: 'https://js.api.here.com/v3/3.0',
  useHTTPS: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxHeremapsModule.withOptions(hereMapsOptions),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
