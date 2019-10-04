import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentHistoryComponent} from './experiment-history.component';

describe('ExperimentHistoryComponent', () => {
  let component: ExperimentHistoryComponent;
  let fixture: ComponentFixture<ExperimentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
