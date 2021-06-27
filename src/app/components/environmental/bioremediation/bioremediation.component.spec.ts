import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioremediationComponent } from './bioremediation.component';

describe('BioremediationComponent', () => {
  let component: BioremediationComponent;
  let fixture: ComponentFixture<BioremediationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioremediationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioremediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
