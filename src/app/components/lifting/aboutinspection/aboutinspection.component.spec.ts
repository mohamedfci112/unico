import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutinspectionComponent } from './aboutinspection.component';

describe('AboutinspectionComponent', () => {
  let component: AboutinspectionComponent;
  let fixture: ComponentFixture<AboutinspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutinspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutinspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
