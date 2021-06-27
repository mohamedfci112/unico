import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimulationComponent } from './stimulation.component';

describe('StimulationComponent', () => {
  let component: StimulationComponent;
  let fixture: ComponentFixture<StimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
