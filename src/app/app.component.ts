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

    });
  }


  mapReady(ready: boolean) {
    if (ready) {
      this.mapReadyEmitter.next(true);
      this.mapReadyEmitter.complete();
    }
  }


}
