import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketControlComponent } from './docket-control.component';

describe('DocketControlComponent', () => {
  let component: DocketControlComponent;
  let fixture: ComponentFixture<DocketControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocketControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
