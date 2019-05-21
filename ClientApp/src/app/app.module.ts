import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatProgressBarModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatAutocompleteModule, MatTooltipModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassComponent } from './components/class/class.component';
import { LoginComponent } from './components/login/login.component';
import { DropFileDirective } from './directives/drop-file.directive';
import { LayoutComponent } from './components/layout/layout.component';
import { ErrorComponent } from './components/error/error.component';
import { CourseComponent } from './components/course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/modals/course/add/add-course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { EditCourseComponent } from './components/modals/course/edit/edit-course.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { AddStudentComponent } from './components/modals/student/add/add-student.component';
import { EditStudentComponent } from './components/modals/student/edit/edit-student.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { WaitlistComponent } from './components/waitlist/waitlist.component';
import { AddGradeComponent } from './components/modals/grade/add/add-grade.component';
import { EditGradeComponent } from './components/modals/grade/edit/edit-grade.component';
import { AddStudentGradeComponent } from './components/modals/student-grade/add/add-student-grade.component';
import { EditStudentGradeComponent } from './components/modals/student-grade/edit/edit-student-grade.component';
import { WaitlistDetailComponent } from './components/waitlist-detail/waitlist-detail.component';
import { AddWaitlistComponent } from './components/modals/waitlist/add/add-waitlist.component';
import { HelpComponent } from './components/help/help.component';
import { AccountComponent } from './components/account/account.component';
import { EditAccountComponent } from './components/modals/account/edit/edit-account.component';
import { DetailWaitlistComponent } from './components/modals/waitlist/detail/detail-waitlist.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DashboardComponent,
    ClassComponent,
    LoginComponent,
    DropFileDirective,
    LayoutComponent,
    ErrorComponent,
    CourseComponent,
    StudentComponent,
    AddCourseComponent,
    CourseDetailComponent,
    EditCourseComponent,
    ClassDetailComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentDetailComponent,
    WaitlistComponent,
    AddGradeComponent,
    EditGradeComponent,
    AddStudentGradeComponent,
    EditStudentGradeComponent,
    WaitlistDetailComponent,
    AddWaitlistComponent,
    HelpComponent,
    AccountComponent,
    EditAccountComponent,
    DetailWaitlistComponent,
    ResetPasswordComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCourseComponent,
    EditCourseComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddGradeComponent,
    EditGradeComponent,
    AddStudentGradeComponent,
    EditStudentGradeComponent,
    AddWaitlistComponent,
    EditAccountComponent,
    DetailWaitlistComponent,
    
  ]
})
export class AppModule { }
