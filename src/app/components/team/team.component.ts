import { Component, OnInit } from '@angular/core';
import { teachersTab } from 'src/app/data/teacherData';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
teachers:any=teachersTab
  constructor() { }

  ngOnInit(): void {
  }

}
