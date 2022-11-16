import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainViewComponent } from './chain-view.component';

describe('ChainViewComponent', () => {
  let component: ChainViewComponent;
  let fixture: ComponentFixture<ChainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChainViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
