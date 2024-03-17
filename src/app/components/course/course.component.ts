import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  //@Input() chefInput:any
@Input() courseInput:any
  constructor() { }

  ngOnInit(): void {
  }

}
