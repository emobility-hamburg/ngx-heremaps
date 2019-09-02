import {TestBed} from '@angular/core/testing';

import {NgxHeremapsClusterService} from './ngx-heremaps-cluster.service';


describe('NgxHeremapsClusterService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NgxHeremapsClusterService
    ]
  }));


  it('should be created', () => {
    const service: NgxHeremapsClusterService<{}> = TestBed.get(NgxHeremapsClusterService);
    expect(service).toBeTruthy();
  });
});
