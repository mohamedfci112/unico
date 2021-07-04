import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicoprofileComponent } from './unicoprofile.component';

describe('UnicoprofileComponent', () => {
  let component: UnicoprofileComponent;
  let fixture: ComponentFixture<UnicoprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicoprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicoprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
