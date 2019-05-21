import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassComponent } from './components/class/class.component';
import { AuthGuard } from './guard/guard.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ErrorComponent } from './components/error/error.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { StudentComponent } from './components/student/student.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { WaitlistComponent } from './components/waitlist/waitlist.component';
import { WaitlistDetailComponent } from './components/waitlist-detail/waitlist-detail.component';
import { AccountComponent } from './components/account/account.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';

const routes: Routes = [
  //path: '', component: LayoutComponent, canActivate: [AuthGuard],
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, },
      { path: 'index', component: DashboardComponent },
      { path: 'student', component: StudentComponent },
      { path: 'student/:id', component: StudentDetailComponent },
      { path: 'grade', component: ClassComponent },
      { path: 'grade/:id', component: ClassDetailComponent },
      { path: 'course', component: CourseComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'waitlist', component: WaitlistComponent },
      { path: 'waitlist/:id', component: WaitlistDetailComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'account', component: AccountComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login' },
  { path: 'reset', component:  ResetPasswordComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
