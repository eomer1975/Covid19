import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChartVisualizerComponent } from './main-chart-visualizer.component';

describe('MainChartVisualizerComponent', () => {
  let component: MainChartVisualizerComponent;
  let fixture: ComponentFixture<MainChartVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainChartVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainChartVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
