import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProliferationExperimentComponent } from './proliferation-experiment.component';

describe('ProliferationExperimentComponent', () => {
  let component: ProliferationExperimentComponent;
  let fixture: ComponentFixture<ProliferationExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProliferationExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProliferationExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
