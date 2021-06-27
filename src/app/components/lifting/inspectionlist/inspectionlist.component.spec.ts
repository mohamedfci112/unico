import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionlistComponent } from './inspectionlist.component';

describe('InspectionlistComponent', () => {
  let component: InspectionlistComponent;
  let fixture: ComponentFixture<InspectionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
