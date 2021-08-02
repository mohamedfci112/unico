import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorminatorComponent } from './norminator.component';

describe('NorminatorComponent', () => {
  let component: NorminatorComponent;
  let fixture: ComponentFixture<NorminatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorminatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorminatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
