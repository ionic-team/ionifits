import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffPage } from './time-off.page';

describe('TimeOffPage', () => {
  let component: TimeOffPage;
  let fixture: ComponentFixture<TimeOffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
