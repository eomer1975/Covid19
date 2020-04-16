import { TestBed } from '@angular/core/testing';

import { RouterActivatorService } from './router-activator-service.service';

describe('RouterActivatorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterActivatorService = TestBed.get(RouterActivatorService);
    expect(service).toBeTruthy();
  });
});
