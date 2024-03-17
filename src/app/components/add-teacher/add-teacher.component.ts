import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { teachersTab } from 'src/app/data/teacherData';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  //  constructor(private activatedRoute: ActivatedRoute, private router: Router, private mService: MatchService) { }
// matches: any = MatchesTab
//match: any
teachers:any=teachersTab
teacher:any
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private tService:TeacherService ) { }

  ngOnInit(): void {
    this.tService.addTeacher(this.teacher).subscribe((data) => {

      console.log('here data', data);
    });


  }

}
