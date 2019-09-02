import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxHereMapComponent} from './ngx-here-map.component';
import {HEREMAPS_OPTIONS} from '../../providers/module.provider';
import {heremapsOptionsMock} from '../../mocks/here_options.mock';
import {NgxHeremapsLoadModulesService} from '../../services/ngx-heremaps-load-modules.service';


describe('NgxHereMapComponent', () => {
  let component: NgxHereMapComponent;
  let fixture: ComponentFixture<NgxHereMapComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxHereMapComponent
      ],
      providers: [
        {
          provide: HEREMAPS_OPTIONS,
          useValue: heremapsOptionsMock
        },
        NgxHeremapsLoadModulesService
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHereMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
