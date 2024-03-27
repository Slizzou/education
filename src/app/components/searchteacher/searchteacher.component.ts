import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-searchteacher',
  templateUrl: './searchteacher.component.html',
  styleUrls: ['./searchteacher.component.css']
})
export class SearchteacherComponent implements OnInit {

  searchTerm: string = '';
  teachers: any= [];
  teachersAvailable: boolean = false; // Initialize to false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.userService.getTeachersByname(this.searchTerm).subscribe((teachers) => {
        this.teachers = teachers;
        console.log("this.teachers",this.teachers)
        this.teachersAvailable = this.teachers.length > 0; // Update teachersAvailable based on the length of teachers array
      });
    } else {
      this.teachers = [];
      this.teachersAvailable = false;
    }
  }
}
