import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalstudiesComponent } from './environmentalstudies.component';

describe('EnvironmentalstudiesComponent', () => {
  let component: EnvironmentalstudiesComponent;
  let fixture: ComponentFixture<EnvironmentalstudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalstudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalstudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
