import { TestBed } from '@angular/core/testing';

import { BrowserAuthService } from './browser-auth.service';

describe('BrowserAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowserAuthService = TestBed.get(BrowserAuthService);
    expect(service).toBeTruthy();
  });
});
