import {Injectable} from '@angular/core';

import {NgxHeremapsClusterServiceGenericDataPoint} from '../interfaces/ngx-heremaps-cluster-service-generic-data-point';
import * as assertNs from 'assert';
import {from} from 'rxjs';


const assert = assertNs;


@Injectable()
export class NgxHeremapsClusterService<T extends NgxHeremapsClusterServiceGenericDataPoint> {

  readonly points: H.clustering.DataPoint[] = [];
  provider: H.clustering.Provider;
  layer: H.map.layer.ObjectLayer;


  constructor() {
  }


  private assertCoordinates(point: T) {
    assert(point.lat !== undefined || point.latitude !== undefined, 'ngx-heremaps: cluster data points need to have lat or latitude property');
    assert(point.lat !== undefined || point.latitude !== undefined, 'ngx-heremaps: cluster data points need to have lng or longitude property');

    point.lat = point.lat || point.latitude;
    point.lng = point.lng || point.longitude;
  }


  protected pushDataPoint(lat: H.geo.Latitude, lng: H.geo.Longitude, weight = 1, data?: T) {
    this.points.push(new H.clustering.DataPoint(lat, lng, weight, data));
  }


  protected pushDataPoints(points: T[]) {
    from(points).subscribe((point: T) => {
      this.assertCoordinates(point);
      this.provider.addDataPoint(new H.clustering.DataPoint(point.lat, point.lng, 1, point));
    });
  }


  configure(points: T[] = [], options?: H.clustering.Provider.Options): H.map.layer.ObjectLayer {
    this.provider = new H.clustering.Provider(this.points, options);
    this.layer = new H.map.layer.ObjectLayer(this.provider);

    this.pushDataPoints(points);

    return this.layer;
  }

}
