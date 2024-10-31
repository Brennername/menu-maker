import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableViewPaneComponent } from './scrollable-view-pane.component';

describe('ScrollableViewPaneComponent', () => {
  let component: ScrollableViewPaneComponent;
  let fixture: ComponentFixture<ScrollableViewPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableViewPaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableViewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
