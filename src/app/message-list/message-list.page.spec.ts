import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListPage } from './message-list.page';

describe('MessageListPage', () => {
  let component: MessageListPage;
  let fixture: ComponentFixture<MessageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
