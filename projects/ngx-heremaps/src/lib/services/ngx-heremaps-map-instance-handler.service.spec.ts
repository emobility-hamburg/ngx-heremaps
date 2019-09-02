import {TestBed} from '@angular/core/testing';

import {NgxHeremapsMapInstanceHandlerService} from './ngx-heremaps-map-instance-handler.service';
import {HEREMAPS_OPTIONS} from '../providers/module.provider';
import {heremapsOptionsMock} from '../mocks/here_options.mock';
import {NgxHeremapsLoadModulesService} from './ngx-heremaps-load-modules.service';
import {disableDomFunctions} from './ngx-heremaps-load-modules.service.spec';


describe('NgxHeremapsMapInstanceHandlerService', () => {


  beforeAll(() => {
    disableDomFunctions();
  });


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxHeremapsMapInstanceHandlerService,
        NgxHeremapsLoadModulesService,
        {
          provide: HEREMAPS_OPTIONS,
          useValue: heremapsOptionsMock
        }
      ]
    });
  });


  it('should be created', () => {
    const service: NgxHeremapsMapInstanceHandlerService = TestBed.get(NgxHeremapsMapInstanceHandlerService);

    expect(service).toBeTruthy();
  });
});
