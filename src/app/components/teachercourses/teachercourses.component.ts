import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { courseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-teachercourses',
  templateUrl: './teachercourses.component.html',
  styleUrls: ['./teachercourses.component.css']
})
export class TeachercoursesComponent implements OnInit {

  courses: any;

  constructor(private cService: courseService, private router: Router) { }

  ngOnInit(): void {
    // Get user ID from session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
const userId = decodedToken.id; // Accessing the 'id' attribute using dot notation
console.log(userId); // Output the user ID to the console

       let user = jwtDecode (token)
      // Fetch courses related to the teacher ID
      this.cService.getCourseByTeacherId(userId).subscribe((response) => {
        console.log('Courses related to the teacher:', response);
        this.courses = response.courses;
      });
    }
  }
}
