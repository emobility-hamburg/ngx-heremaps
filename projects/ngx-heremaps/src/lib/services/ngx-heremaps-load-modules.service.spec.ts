import {TestBed} from '@angular/core/testing';

import {NgxHeremapsServicePlatformOptions} from '../interfaces/ngx-heremaps-service-platform.options';
import {HEREMAPS_OPTIONS} from '../providers/module.provider';
import {NgxHeremapsLoadModulesService} from './ngx-heremaps-load-modules.service';
import {interval, Subject} from 'rxjs';
import {skipWhile, take} from 'rxjs/operators';
import {heremapsOptionsMock} from '../mocks/here_options.mock';


export function disableDomFunctions() {
  // we dont want to mount modules in testing
  spyOn(document.body, 'appendChild');
}

describe('LoadSelfHostedModulesService', () => {


  beforeAll(() => {
    disableDomFunctions();
  });


  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          NgxHeremapsLoadModulesService,
          {
            provide: HEREMAPS_OPTIONS,
            useValue: heremapsOptionsMock
          }
        ]
      }
    );
  });


  it('should be created', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);

    expect(service).toBeTruthy();
  });


  it('should create module names', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);

    const expectation = 'mapsjs-core.js';

    const result = service['createModuleName']('core', 'js');

    expect(expectation).toBe(result);
  });


  it('should build ressource url for self hosted modules', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);
    const options: NgxHeremapsServicePlatformOptions = TestBed.get(HEREMAPS_OPTIONS);

    const expectation = new URL(options.modulesRessourcePath, location.href);

    const result = service['getRessourcePath']();

    expect(result.toString()).toBe(expectation.toString());
  });


  it('should build ressource url for remote hosted modules', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);
    const options: NgxHeremapsServicePlatformOptions = TestBed.get(HEREMAPS_OPTIONS);

    const remotePath = 'https://js.api.here.com/v3/3.0';
    const expectation = new URL(remotePath.concat('/'));

    options.modulesRessourcePath = remotePath;

    const result = service['getRessourcePath']();

    expect(result.toString()).toBe(expectation.toString());
  });


  it('should mount script module', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);

    const module = 'core';

    spyOn(document, 'createElement').and.callThrough();
    spyOn<any>(service, 'getModuleUrl').and.callThrough();

    const loadedObservable = service.mountScriptModule(module);

    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(service['getModuleUrl']).toHaveBeenCalledWith(module, 'js');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(loadedObservable.operator['total']).toBe(1);
  });


  it('should mount stylesheet module', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);

    const module = 'ui';
    spyOn(document, 'createElement').and.callThrough();
    spyOn<any>(service, 'getModuleUrl').and.callThrough();

    service.mountStylesheetModule(module);

    expect(document.createElement).toHaveBeenCalledWith('link');
    expect(service['getModuleUrl']).toHaveBeenCalledWith(module, 'css');
    expect(document.body.appendChild).toHaveBeenCalled();
  });


  it('should mount all modules', () => {
    const service: NgxHeremapsLoadModulesService = TestBed.get(NgxHeremapsLoadModulesService);

    spyOn(service, 'mountScriptModule').and.callFake((name: string) => {
      const obs = new Subject<Event>();
      interval(10).pipe(take(2)).subscribe(() => obs.next(new Object() as Event));

      return obs;
    });

    service.modulesMounted
      .pipe(
        skipWhile((loaded) => loaded === false)
      )
      .subscribe((loaded) => {
        expect(loaded).toBeTruthy('not loaded');
      });

    service.mountAllModules();

    expect().nothing();
  });


});
