import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.css']
})
export class CourseinfoComponent implements OnInit {
  course: any// Initialize course object to an empty object

  constructor(private activatedRoute:ActivatedRoute,private cService:courseService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.cService.getCourseById(id).subscribe(
        (response) => {
          console.log("here response", response);
          this.course = response.obj;
          console.log("here is your teacher firstName",response.obj.teacherID.firstName)
        },
        (error) => {
          console.error("Error fetching course:", error);
          // Handle error gracefully, e.g., display an error message to the user
        }
      );
    });
  }
}


