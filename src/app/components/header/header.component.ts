import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Refresh user information when navigation ends (e.g., after login/logout)
        this.checkLoggedIn();
      }
    });
  }

  checkLoggedIn() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.user = jwtDecode(token);
      console.log("this is my user", this.user);
    }
  }

  isLoggedIN() {
    return !!sessionStorage.getItem("token");
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
