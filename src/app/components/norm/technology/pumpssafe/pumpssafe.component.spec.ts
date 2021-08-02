import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpssafeComponent } from './pumpssafe.component';

describe('PumpssafeComponent', () => {
  let component: PumpssafeComponent;
  let fixture: ComponentFixture<PumpssafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpssafeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpssafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
