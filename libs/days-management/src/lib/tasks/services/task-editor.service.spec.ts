import { TestBed } from '@angular/core/testing';

import { TaskEditorService } from './task-editor.service';

describe('TaskEditorService', () => {
  let service: TaskEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
