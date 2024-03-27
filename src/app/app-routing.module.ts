import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { TeamComponent } from './components/team/team.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { CourseinfoComponent } from './components/courseinfo/courseinfo.component';
import { TeacherdashboardComponent } from './components/teacherdashboard/teacherdashboard.component';
import { AddevaluationComponent } from './components/addevaluation/addevaluation.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ParentdashboardComponent } from './components/parentdashboard/parentdashboard.component';
import { StudentdashboardComponent } from './components/studentdashboard/studentdashboard.component';



const routes: Routes = [
{ path:"courses",component:CoursesComponent},
{ path:"",component:HomepageComponent},
{path:"teachers",component:TeamComponent},
{path:"login",component:LoginComponent},
{path:"signupstudent",component:SignupComponent},
{path:"signupparent",component:SignupComponent},
{path:"signupadmin",component:SignupComponent},
{path:"signupteacher",component:SignupComponent},
{path:"editCourse/:id",component:AddCourseComponent},
{path:"courseInfo/:id",component:CourseinfoComponent},
{path:"addeval/:id",component:AddevaluationComponent},







{path:"addcourse",component:AddCourseComponent},
{path:"addteacher",component:AddTeacherComponent},
{path:"admin",component:AdminComponent},
{path:"teacherdashboard",component:TeacherdashboardComponent},
{path:"parentdashboard",component:ParentdashboardComponent},
{path:"studentdashboard",component:StudentdashboardComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
