import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QhsepolicyComponent } from './qhsepolicy.component';

describe('QhsepolicyComponent', () => {
  let component: QhsepolicyComponent;
  let fixture: ComponentFixture<QhsepolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QhsepolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QhsepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
