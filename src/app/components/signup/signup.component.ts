import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imagePreview: any;
  signupForm!: FormGroup;
  path: string = "";

  constructor(private formBuilder: FormBuilder, private uService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.path = this.router.url;

    let role: string;
    switch (this.path) {
      case '/signupstudent':
        role = 'student';
        break;
      case '/signupteacher':
        role = 'requested_teacher'; // Assign 'requested_teacher' role if signing up as a teacher
        break;
      case '/signupparent':
        role = 'parent';
        break;
      case '/signupadmin':
        role = 'admin';
        break;
      default:
        role = 'student'; // Default to student if path is not recognized
    }

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      img: [''],
      phoneNumber:[''],
      cv: [''],
      role: [role] // Assign role based on the path
    });
  }

  signup() {
    console.log("Here User", this.signupForm.value);
  
    const role = this.signupForm.value.role;
  
    this.uService.signup(
      {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        pwd: this.signupForm.value.pwd,
        phoneNumber: this.signupForm.value.phoneNumber,
        role: role
      },
      this.signupForm.value.img,
      this.signupForm.value.cv
    ).subscribe(
      (result) => {
        console.log("Here result ", result.msg);
  
        // Alert user based on role
        if (role == 'requested_teacher') {
          alert("Your request as a teacher is under validation. Your initial role is set as requested_teacher.");
          this.router.navigate(['']); 

        } else if (result.msg === "Email Exists") {
          alert("This email already exists. Please use a different email.");
        } else if (result.msg === "Please verify your children's phone number.") {
          alert("Please verify your children's phone number.");
        } else {
          alert("Sign up succesfully ");


            this.router.navigate([''])
        }
      },
      (error) => {
        console.error("Error:", error);
        // Handle error if necessary
      }
    );
  }
  

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ img: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onPDFSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ cv: file });
      this.signupForm.updateValueAndValidity();
    }
  }
}
