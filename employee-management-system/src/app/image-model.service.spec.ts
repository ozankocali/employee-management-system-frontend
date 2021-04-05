import { TestBed } from '@angular/core/testing';

import { ImageModelService } from './image-model.service';

describe('ImageModelService', () => {
  let service: ImageModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
