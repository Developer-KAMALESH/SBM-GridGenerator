import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSelector } from './store-selector';

describe('StoreSelector', () => {
  let component: StoreSelector;
  let fixture: ComponentFixture<StoreSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
