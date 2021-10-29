import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinesystemComponent } from './onlinesystem.component';

describe('OnlinesystemComponent', () => {
  let component: OnlinesystemComponent;
  let fixture: ComponentFixture<OnlinesystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinesystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinesystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
