import { TestBed, inject } from '@angular/core/testing';

import { ModelServiceService } from './model-service.service';

describe('ModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelServiceService]
    });
  });

  it('should be created', inject([ModelServiceService], (service: ModelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
