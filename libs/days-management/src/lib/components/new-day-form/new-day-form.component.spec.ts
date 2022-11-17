import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDayFormComponent } from './new-day-form.component';

describe('NewDayFormComponent', () => {
  let component: NewDayFormComponent;
  let fixture: ComponentFixture<NewDayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDayFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewDayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
