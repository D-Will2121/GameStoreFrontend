import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceoflifeComponent } from './sliceoflife.component';

describe('SliceoflifeComponent', () => {
  let component: SliceoflifeComponent;
  let fixture: ComponentFixture<SliceoflifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliceoflifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceoflifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
