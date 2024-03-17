import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //  signupForm!:FormGroup
  loginForm!: FormGroup
  user: any = {};
  msgError:string='';
  //private formBuilder:FormBuilder)
  constructor(private formBuilder: FormBuilder, private uService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      pwd: [''],
    });
  }
  login() {
    this.uService.login(this.loginForm.value).subscribe(
      (result) => {
        console.log("Here result after login", result);
        if (result.token){
          sessionStorage.setItem('token',result.token);
          let decodedToken:any=jwtDecode(result.token);
          console.log("Here decoded Token",decodedToken)
          if (decodedToken.role=='admin'){
            this.router.navigate(['admin']);

          } else {
            this.router.navigate(['']);

          }


        } else{
          this.msgError="Please Check your Email /PWD"
        }
      }
    )

  }
}

