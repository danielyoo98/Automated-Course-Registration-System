import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpEvent, HttpEventType } from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { MatSnackBar } from '@angular/material';
import { UploadError } from 'src/app/models/uploadError';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  displayedColumns: string[] = ['position'];

  public isOverDropArea: boolean = false;
  public progress: number = 0;
  public isUploading: boolean = false;
  public files: File[] = [];
  public errors: Map<string, Map<string, Array<string>>> = new Map<string, Map<string, Array<string>>>();

  constructor(private uploadService: UploadService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  onFileDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  inputOnFileChange(event) {
    let files: FileList = event.target.files;

    this.files.splice(0);

    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  upload() {
    this.errors.clear();

    if (this.files.length <= 0) {
      this.snackBar.open("Please select files to upload", "Error", {
        duration: 4000,
      });

      return;
    }

    this.isUploading = true;

    this.uploadService.upload(this.files)
      .subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {

          let errors: UploadError[] = event.body;

          errors.forEach(e => {
            if (this.errors.get(e.fileName) === undefined) {
              this.errors.set(e.fileName, new Map<string, Array<string>>());
            }

            if (this.errors.get(e.fileName).get(e.reason) == undefined) {
              this.errors.get(e.fileName).set(e.reason, new Array<string>());
            }

            this.errors.get(e.fileName).get(e.reason).push(e.row);
          });

          this.isUploading = false;
        }
      }, errors => {
        if (this.errors.get('Other') === undefined) {
          this.errors.set('Other', new Map<string, Array<string>>());
        }

        if (this.errors.get('Other').get('File could not be read, ensure that 1) the file is a csv, 2) the file exists, 3) contains valid data, and 4) the database is running') == undefined) {
          this.errors.get('Other').set('File could not be read, ensure that 1) the file is a csv, 2) the file exists, 3) contains valid data, and 4) the database is running', new Array<string>());
        }

        this.isUploading = false;
      });
  }

  browseFiles() {
    document.getElementById("file-input").click();
  }

  removeFile(index) {
    this.files.splice(index, 1);
  }

  onDragOver() {
    // console.log('over drop area');
    this.isOverDropArea = true;
  }

  onDragLeave() {
    this.isOverDropArea = false;
    // console.log('leave drop area');
  }

  arrayGetN(n: number, array: any[]) {
    let arr: any[] = [];
    let length = n;

    if (n > array.length) {
      length = array.length;
    }

    for (let i = 0; i < length; i++) {
      arr.push(array[i]);
    }

    return arr;
  }

  getRowNumbersString(array: any[]) {
    let str: string = "";
    array = this.arrayGetN(100, array);

    for (let i = 0; i < array.length; i++) {
      str += array[i];
      if (i != array.length - 1) {
        str += ", ";
      }
    }

    return str;
  }
}
