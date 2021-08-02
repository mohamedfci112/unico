import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdmComponent } from './rdm.component';

describe('RdmComponent', () => {
  let component: RdmComponent;
  let fixture: ComponentFixture<RdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
