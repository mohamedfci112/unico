import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19policyComponent } from './covid19policy.component';

describe('Covid19policyComponent', () => {
  let component: Covid19policyComponent;
  let fixture: ComponentFixture<Covid19policyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Covid19policyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19policyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
