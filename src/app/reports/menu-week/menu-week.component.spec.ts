import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWeekComponent } from './menu-week.component';

describe('MenuWeekComponent', () => {
  let component: MenuWeekComponent;
  let fixture: ComponentFixture<MenuWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
