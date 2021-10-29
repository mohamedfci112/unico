import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhomeComponent } from './inhome.component';

describe('InhomeComponent', () => {
  let component: InhomeComponent;
  let fixture: ComponentFixture<InhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
