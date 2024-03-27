import { Component, OnInit } from '@angular/core';
import { courseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  constructor(private courseService: courseService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllcourses().subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.courses = response.courses;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
