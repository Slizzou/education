import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { courseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseform!: FormGroup;
  userId: string | undefined;
  isAdmin: boolean = false;
  students: any[] = [];
  courseId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cService: courseService,
    private uService: UserService
  ) { }

  ngOnInit(): void {
    this.courseform = this.formBuilder.group({
      name: [''],
      description: [''],
      duration: [''],
      selectedStudents: [[]]
    });

    // Get user ID and role from session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.id;
      this.isAdmin = decodedToken.role === 'admin';
      if (this.isAdmin) {
        this.getAllStudents();
      }
    }

    // Get course ID from the route parameters
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getAllStudents() {
    this.uService.getAllStudents().subscribe((response) => {
      this.students = response.students;
    });
  }

  addCourse() {
    const courseFormValue = this.courseform.value;
  
    // Check if the user is an admin
    if (this.isAdmin) {
      // Editing an existing course
      const course = {
        id: this.courseId, // Use the obtained course ID
        name: courseFormValue.name,
        description: courseFormValue.description,
        duration: courseFormValue.duration,
        teacherID: this.userId,
        students: courseFormValue.selectedStudents
      };
  
      // Call the editCourse method to update the existing course
      this.cService.editCourse(course).subscribe((data) => {
        if (data) {
          console.log("Updated course with students", course.students);
          alert("Course has been updated successfully");
          console.log("Here is the updated course", data);
          this.router.navigate(['']);
        }
      });
    } else {
      // Adding a new course
      const course = {
        name: courseFormValue.name,
        description: courseFormValue.description,
        duration: courseFormValue.duration,
        teacherID: this.userId,
        students: [] // No students added when creating a new course
      };
  
      // Call the addCourse method to create a new course
      this.cService.addCourse(course).subscribe((data) => {
        if (data) {
          alert("Course has been added successfully");
          console.log("Here is the added course", data);
          this.router.navigate(['']);
        }
      });
    }
  }
  
}
