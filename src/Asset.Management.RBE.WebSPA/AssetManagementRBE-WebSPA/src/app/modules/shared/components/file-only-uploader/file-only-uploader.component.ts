import {Component, OnInit, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-file-only-uploader',
  templateUrl: './file-only-uploader.component.html',
  styleUrls: ['./file-only-uploader.component.scss']
})
export class FileOnlyUploaderComponent implements OnInit {
  formDataName: string;
  id: number;
  whatToUpload: string;

  onFileUpload = new EventEmitter<FormData>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.formDataName = this.data.formDataName;
    this.id = this.data.id;
    this.whatToUpload = this.data.whatToUpload;
   }

  ngOnInit(): void {

  }

  onSubmitNewFile(formData: FormData): void {
    this.onFileUpload.emit(formData);
  }

}
