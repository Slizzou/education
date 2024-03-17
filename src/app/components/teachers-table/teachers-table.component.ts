import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachers: any[] = [];

  constructor(private uService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.showAllTeachers();
  }

  showAllTeachers() {
    this.uService.getAllTeachers().subscribe(
      (response) => {
        console.log('Response:', response);
        this.teachers = response.teachers;
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred while fetching teachers.');
      }
    );
  }

  goToMatchInfo(teacherId: any) {
    this.router.navigate([`matchinfo/${teacherId}`]);
  }

  goToEditMatch(teacherId: any) {
    this.router.navigate([`editMatch/${teacherId}`]);
  }

  validateTeacher(teacherId: string) {
    console.log("Here is your teacherId", teacherId);
    // Call the service to get the user by ID
    this.uService.getUserById(teacherId).subscribe(
      (userData) => {
        // Check if the user exists and is a requested_teacher
        if (userData && userData.obj.role === 'requested_teacher') {
          // Update the role to 'teacher' in the fetched user object
          userData.obj.role = 'teacher';
          console.log("New user data", userData.obj);
          // Call the service to validate the teacher with the updated user object
          this.uService.validateTeacher(userData.obj).subscribe(
            (res) => {
              console.log("Response after validation:", res);
              // Update the role in the local teachers array
              alert("Teacher validated successfully!");
              this.showAllTeachers();
            },
            (error) => {
              console.error("Error validating teacher:", error);
              alert("An error occurred while validating teacher.");
            }
          );
        } else if (!userData) {
          // Handle case where user is not found
          alert("Teacher not found.");
        } else if (userData.obj.role === 'teacher') {
          // Handle case where teacher is already validated
          alert("This teacher has already been validated.");
        } else {
          // Handle case where user is not a requested_teacher
          alert("User is not eligible for validation.");
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      }
    );
  }
  
  }
  

  


