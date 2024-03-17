import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CounterComponent } from './components/counter/counter.component';
import { EventsComponent } from './components/events/events.component';
import { TeamComponent } from './components/team/team.component';
import { NewsComponent } from './components/news/news.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllusersComponent } from './components/allusers/allusers.component';
import { CourseinfoComponent } from './components/courseinfo/courseinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FeaturesComponent,
    CoursesComponent,
    CounterComponent,
    EventsComponent,
    TeamComponent,
    NewsComponent,
    NewsletterComponent,
    MenuComponent,
    HomepageComponent,
    CourseComponent,
    TeacherComponent,
    LoginComponent,
    SignupComponent,
    AddCourseComponent,
    AddTeacherComponent,
    AdminComponent,
    TeachersTableComponent,
    CoursesTableComponent,
    AllusersComponent,
    CourseinfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
