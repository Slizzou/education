import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.css']
})
export class CourseinfoComponent implements OnInit {
  course: any; // Change type declaration from any[] to any

  constructor(private activatedRoute: ActivatedRoute, private cService: courseService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.cService.getCourseById(id).subscribe(
        (response) => {
          console.log("here response", response);
          this.course = response.obj;
        },
        (error) => {
          console.error("Error fetching course:", error);
          // You can handle the error here, for example:
          // Display an error message to the user
        }
      );
    });
  }
}
