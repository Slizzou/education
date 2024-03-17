import { Component, OnInit } from '@angular/core';
import { coursesTab } from 'src/app/data/courseData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
   courses:any=coursesTab

  constructor() { }

  ngOnInit(): void {
  }

}
