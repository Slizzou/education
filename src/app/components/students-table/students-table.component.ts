import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { courseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  courses: any;

  constructor(private cService: courseService, private router: Router) { }

  ngOnInit(): void {
    // Get user ID from session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id; // Accessing the 'id' attribute using dot notation
      console.log(userId); // Output the user ID to the console

      // Fetch courses related to the teacher ID
      this.cService.getCourseByTeacherId(userId).subscribe((response) => {
        console.log('Courses related to the teacher:', response);
        this.courses = response.courses;
      });
    }
  }

  goToAddEval(courseId: any) {
    // Pass the token as a query parameter when navigating
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate([`addeval/${courseId}`], { queryParams: { token } });
    } else {
      console.error("Token not found");
    }
  }
}
