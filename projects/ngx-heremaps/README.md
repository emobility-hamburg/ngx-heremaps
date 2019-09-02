# ngx-heremaps

Native Angular library loader for here maps JS  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to register for Freemium or Pro Account

Actually only heremaps JS V3 is supported.

Actually Ivy is not supported (will change with heremaps V3.1 support).

```
https://developer.here.com/
```

### Installing

```bash
npm install @stromnetz-hamburg/ngx-heremaps --save
npm install @types/heremaps --save-dev
```

### Integrate in your Project

#### app.module

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {NgxHeremapsModule, NgxHeremapsServicePlatformOptions} from '@stromnetz-hamburg/ngx-heremaps';

const hereMapsOptions: NgxHeremapsServicePlatformOptions = {
  app_id: 'your_app_id',
  app_code: 'your_app_code',
  modules: ['core', 'service', 'ui'], // minimum modules to get it up an running
  modulesRessourcePath: 'https://js.api.here.com/v3/3.0', // or selfhosted under eg. 'assets/heremaps/v3/3.0'
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
```

#### app.component.html

```html
<div id="map">
  <ngx-heremaps-map #ngxMap
                    (mapReady)="mapReady($event)">
  </ngx-heremaps-map>
</div>
```

#### app.component.ts

```typescript
import {Component, HostListener, ViewChild} from '@angular/core';

import {NgxHereMapComponent} from '@stromnetz-hamburg/ngx-heremaps';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  private readonly mapReadyEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('ngxMap', {static: false}) ngxMap: NgxHereMapComponent;


  @HostListener('window:resize') resize() {
    if (this.ngxMap) {
      this.ngxMap.map.getViewPort().resize();
    }
  }


  constructor() {
    this.subscribeToMapReady();
  }


  private subscribeToMapReady() {
    this.mapReadyEmitter.subscribe(() => {
        // map is ready for further configuration initialization etc.
        // if you need to pass the map-object around i recommend creating an injection token and filling it right here
    });
  }


  mapReady(ready: boolean) {
    if (ready) {
      this.mapReadyEmitter.next(true);
      this.mapReadyEmitter.complete();
    }
  }
}
```

#### app.component.css

```css
#map {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
```

## Addendum

There is also a basic clustering injectable named NgxHeremapsClusterService.

Once injected you can use the following method signature and simply add the returned layer to your map

```typescript
configure(points: T[] = [], options?: H.clustering.Provider.Options): H.map.layer.ObjectLayer 
``` 

## Authors

* **CUBI TECH Inh. Paul Keller** - *Initial work* - [CUBITECH](https://github.com/CUBITECH)


## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
