import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftingcertificationComponent } from './liftingcertification.component';

describe('LiftingcertificationComponent', () => {
  let component: LiftingcertificationComponent;
  let fixture: ComponentFixture<LiftingcertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftingcertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftingcertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
