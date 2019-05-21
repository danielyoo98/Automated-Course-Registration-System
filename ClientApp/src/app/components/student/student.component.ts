import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTooltipModule, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AddStudentComponent } from '../modals/student/add/add-student.component';
import { first } from 'rxjs/operators';
import { EditStudentComponent } from '../modals/student/edit/edit-student.component';

export interface StudentDialogData {
  student: Student;
  students: Student[];
}


@Component({
  selector: 'student',
  styleUrls: ['student.component.css'],
  templateUrl: 'student.component.html',
})

export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['studentId', 'studentName', 'view', 'edit'];
  dataSource: MatTableDataSource<Student>;
  students: Student[] = [];
  newStudent: Student;
  editStudent: Student;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getStudents();
  }


  openSnackbar(message: string, style: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000, verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: style
    });
  }


  openAddDialog() {
    this.newStudent = new Student();
    let dialogRef = this.dialog.open(AddStudentComponent, {
      width: '65vw',
      minWidth: '300px',
      maxWidth: '600px',
      data: {
        student: this.newStudent,
        students: this.students
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addStudent(this.newStudent);
      }
      this.newStudent = new Student();
    });
  }

  openEditDialog(student: Student) {
    this.editStudent = student;

    let dialogRef = this.dialog.open(EditStudentComponent, {
      width: '65vw',
      minWidth: '300px',
      maxWidth: '600px',
      data: {
        student: this.editStudent,
        students: this.students
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newEditStudent = result.student;
        this.updateStudent(newEditStudent.studentId, newEditStudent);
      }
      this.editStudent = new Student();
    });
  }


  initTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
      this.initTable(this.students);
    });
  }
  viewStudent(student: Student) {
    this.router.navigate([`/student/${student.studentId}`]);
  }

  getStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
      this.initTable(this.students);
    });

  }

  addStudent(student: Student) {
    this.studentService.addStudent(student).pipe(first()).subscribe((response: Response) => {
      this.openSnackbar("New student successfully created", 'success-snackbar');
      this.refresh();
    }, err => {
      this.openSnackbar("Failed to create new student", 'error-snackbar');
    })
  }

  updateStudent(studentId: string, student: Student) {
    this.studentService.updateStudent(studentId, student).pipe(first()).subscribe((response: any) => {
      this.openSnackbar(`Student #${studentId} successfully updated`, 'success-snackbar');

      this.refresh();
    }, err => {
      this.openSnackbar(`Failed to update student #${studentId}`, 'error-snackbar');
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
