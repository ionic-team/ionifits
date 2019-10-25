import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationModalPage } from './implementation-modal.page';

describe('ImplementationModalPage', () => {
  let component: ImplementationModalPage;
  let fixture: ComponentFixture<ImplementationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplementationModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
