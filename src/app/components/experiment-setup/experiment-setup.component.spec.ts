import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentSetupComponent } from './experiment-setup.component';

describe('ExperimentSetupComponent', () => {
  let component: ExperimentSetupComponent;
  let fixture: ComponentFixture<ExperimentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
