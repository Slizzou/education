import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachercoursesComponent } from './teachercourses.component';

describe('TeachercoursesComponent', () => {
  let component: TeachercoursesComponent;
  let fixture: ComponentFixture<TeachercoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachercoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachercoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
