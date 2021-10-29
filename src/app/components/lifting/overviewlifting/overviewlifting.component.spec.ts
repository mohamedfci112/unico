import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewliftingComponent } from './overviewlifting.component';

describe('OverviewliftingComponent', () => {
  let component: OverviewliftingComponent;
  let fixture: ComponentFixture<OverviewliftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewliftingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewliftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
