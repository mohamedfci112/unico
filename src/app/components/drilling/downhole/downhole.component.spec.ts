import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownholeComponent } from './downhole.component';

describe('DownholeComponent', () => {
  let component: DownholeComponent;
  let fixture: ComponentFixture<DownholeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownholeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
