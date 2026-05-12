import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLayout } from './print-layout';

describe('PrintLayout', () => {
  let component: PrintLayout;
  let fixture: ComponentFixture<PrintLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(PrintLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
