import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:any
  constructor(private router:Router) { }


  ngOnInit(): void {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.user = jwtDecode(token);
      console.log("this is my user",this.user)
    }
  }

  isLoggedIN() {
    return !!sessionStorage.getItem("token");
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate(['']);
  }
  getAvatarUrl(): string {
    // Check if user object and avatar path exist
    if (this.user && this.user.avatar) {
      // Assuming 'http://localhost:3000' is the base URL of your backend server
      return `http://localhost:3000/${this.user.avatar}`;
    } else {
      // Default avatar image URL if user or avatar path is not available
      return 'default-avatar-url.jpg';
    }
  }
  
}
  


