import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  users: any;

  constructor(private uService:UserService,private router:Router ) { }

  ngOnInit(): void {
    this.uService.getAllUsers().subscribe((response) => {

      console.log('here response', response);
      this.users = response.users;
    }


    );
  }
  goToMatchInfo(x: any) {
    this.router.navigate([`matchinfo/${x}`]);

  }
  

  goToEditMatch(x:any){
    this.router.navigate([`editMatch/${x}`]);
  }

  deleteUserById(id: any) {
    this.uService.deleteUserById(id).subscribe(
      (data) => {
        console.log("Here Data:", data);
        if (data && data.response) {
          // Update the user list with the response from getAllUsers
          this.uService.getAllUsers().subscribe(
            (res) => {
              console.log("Here are all remaining users:", res);
              this.users = res.users;
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
  
  
  
  
  

  }


