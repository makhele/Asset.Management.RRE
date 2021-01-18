import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: any[] = [];
  fileUploaded: boolean;
  fileForm: FormGroup;

  @Input() whatIsBeingUploaded: string;
  @Input() name: string;
  @Input() id: number;
  @Output() uploadedFile = new EventEmitter<any>();

  constructor( private fb: FormBuilder, private toaster: NbToastrService) {
    this.fileUploaded = false;
  }

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      note: [''],
    });
  }

  onSubmit(uploadedFile: any): void {
    uploadedFile.note = uploadedFile.note.trimAndRemoveExtraSpaces().capitalize();
    const formData: FormData = new FormData();
    formData.append(this.name, this.files[0], this.files[0].name);
    formData.append('id', this.id.toString());
    formData.append('note', uploadedFile.note);
    this.uploadedFile.emit(formData);
  }

  /**
   * on file drop handler
   */
  // tslint:disable-next-line:typedef
  onFileDropped($event) {
    console.log($event);
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number): void {
    this.files.splice(index, 1);
    this.fileUploaded = false;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number): void {
    console.log('this files', this.files);
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>): void {
    if (files[0].type === 'application/pdf'){
      this.fileUploaded = true;
      console.log(files);
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
      }
      this.uploadFilesSimulator(0);
    }
    else { this.toaster.warning('Only PDF files can be uploaded', 'Warning:' ); }


  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
