import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoolermachineComponent } from './spoolermachine.component';

describe('SpoolermachineComponent', () => {
  let component: SpoolermachineComponent;
  let fixture: ComponentFixture<SpoolermachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpoolermachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoolermachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
