import { TestBed } from '@angular/core/testing';

import { localStorageService } from './session-storage.service';

describe('localStorageService', () => {
  let service: localStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(localStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
