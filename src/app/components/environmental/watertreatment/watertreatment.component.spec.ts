import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatertreatmentComponent } from './watertreatment.component';

describe('WatertreatmentComponent', () => {
  let component: WatertreatmentComponent;
  let fixture: ComponentFixture<WatertreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatertreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatertreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
