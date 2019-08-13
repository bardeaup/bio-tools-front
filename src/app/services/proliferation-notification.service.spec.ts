import { TestBed } from '@angular/core/testing';

import { ProliferationNotificationService } from './proliferation-notification.service';

describe('ProliferationNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProliferationNotificationService = TestBed.get(ProliferationNotificationService);
    expect(service).toBeTruthy();
  });
});
