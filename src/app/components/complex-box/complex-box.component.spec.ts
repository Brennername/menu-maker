import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexBoxComponent } from './complex-box.component';

describe('ComplexBoxComponent', () => {
  let component: ComplexBoxComponent;
  let fixture: ComponentFixture<ComplexBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
