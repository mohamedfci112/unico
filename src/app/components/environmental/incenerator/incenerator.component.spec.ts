import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InceneratorComponent } from './incenerator.component';

describe('InceneratorComponent', () => {
  let component: InceneratorComponent;
  let fixture: ComponentFixture<InceneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InceneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InceneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
