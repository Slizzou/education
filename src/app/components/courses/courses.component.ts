import { Component, OnInit } from '@angular/core';
import { coursesTab } from 'src/app/data/courseData';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
courses:any=coursesTab
  constructor() { }

  ngOnInit(): void {
  }

}
