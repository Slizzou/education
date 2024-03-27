import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-founded-teacher',
  templateUrl: './founded-teacher.component.html',
  styleUrls: ['./founded-teacher.component.css']
})
export class FoundedTeacherComponent {
  @Input() teacher: any;
}
