import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskButtonComponent } from './add-new-task-button.component';

describe('AddNewTaskButtonComponent', () => {
  let component: AddNewTaskButtonComponent;
  let fixture: ComponentFixture<AddNewTaskButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTaskButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
