import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionquoteComponent } from './inspectionquote.component';

describe('InspectionquoteComponent', () => {
  let component: InspectionquoteComponent;
  let fixture: ComponentFixture<InspectionquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionquoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
