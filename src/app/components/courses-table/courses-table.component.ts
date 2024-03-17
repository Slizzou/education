import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courses:any

  
  
  

  constructor(private cService:courseService,private router:Router) { }


  ngOnInit(): void {
    this.cService.getAllcourses().subscribe((response) => {

      console.log('here response', response);
      this.courses = response.courses
    }


    );
  }
  deleteCourseById(id: any) {
    this.cService.deleteCourseById(id).subscribe(
      (data) => {
        console.log("Here Data:", data);
        if (data && data.response) {
          // Update the user list with the response from getAllUsers
          this.cService.getAllcourses().subscribe(
            (res) => {
              console.log("Here are all remaining users:", res);
              this.courses = res.courses;
            },
            (error) => {
              console.error("Error fetching remaining users:", error);
              // Handle error if necessary
            }
          );
        } else {
          // Handle the case where data.response is false
        }
      },
      (error) => {
        console.error("Error deleting user:", error);
        // Handle error if necessary
      }
    );
  }
  goToEditCourse(x:any){
    this.router.navigate([`editCourse/${x}`]);
  }
  showCourseInfo(x:any){
    this.router.navigate([`courseInfo/${x}`]);
  }
 
}
