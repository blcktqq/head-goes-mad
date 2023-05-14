import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompleteTaskDialogComponent } from './uncomplete-task-dialog.component';

describe('UncompleteTaskDialogComponent', () => {
  let component: UncompleteTaskDialogComponent;
  let fixture: ComponentFixture<UncompleteTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UncompleteTaskDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UncompleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
