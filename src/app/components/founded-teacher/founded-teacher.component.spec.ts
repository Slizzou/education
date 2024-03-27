import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundedTeacherComponent } from './founded-teacher.component';

describe('FoundedTeacherComponent', () => {
  let component: FoundedTeacherComponent;
  let fixture: ComponentFixture<FoundedTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundedTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundedTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
