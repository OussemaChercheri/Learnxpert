import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzelsComponent } from './puzzels.component';

describe('PuzzelsComponent', () => {
  let component: PuzzelsComponent;
  let fixture: ComponentFixture<PuzzelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PuzzelsComponent]
    });
    fixture = TestBed.createComponent(PuzzelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
