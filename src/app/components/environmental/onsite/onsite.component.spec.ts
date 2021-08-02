import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteComponent } from './onsite.component';

describe('OnsiteComponent', () => {
  let component: OnsiteComponent;
  let fixture: ComponentFixture<OnsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
