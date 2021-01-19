import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IVehicle } from '../../shared/models/vehicle.model';
import { VehicleVerificationService } from '../vehicle-verification.service';
import { FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'app-image-upload-only',
  templateUrl: './image-upload-only.component.html',
  styleUrls: ['./image-upload-only.component.scss']
})
export class ImageUploadOnlyComponent implements OnInit {
  vehicle: IVehicle;
  files = new Array(6);
  fileCount = 0;
  imageUrls = new Array(6);
  fileUploaded: boolean;
  user: IUser;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IVehicle, private vehicleVerificationService: VehicleVerificationService,
              public dialogRef: MatDialogRef<ImageUploadOnlyComponent>, public dialog: MatDialog, private fb: FormBuilder,
              private toaster: NbToastrService, private router: Router, private storage: AngularFireStorage,
              private readonly spinnerOverlayService: SpinnerOverlayService, private authenticationService: AuthenticationService){
    this.authenticationService.currentUser.subscribe(user => this.user = user)
    this.fileUploaded = false;
    this.vehicle = data;

    if (this.vehicle.isEdit) {
      this.getPhotosImageUrl();
    }
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const observarbles = [];
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    const fileLabel = (this.vehicle.fleetNumber === null || this.vehicle.fleetNumber === '') ?
      this.vehicle.registrationNumber : this.vehicle.fleetNumber;
    this.files.forEach((file, index) => {
      let fileName;
      switch (index) {
        case 0:
          fileName = `images/${fileLabel}/${fileLabel}_front.png`;
          this.vehicle.front = fileName;
          break;
        case 1:
          fileName = `images/${fileLabel}/${fileLabel}_back.png`;
          this.vehicle.back = fileName;
          break;
        case 2:
          fileName = `images/${fileLabel}/${fileLabel}_iso.png`;
          this.vehicle.iso = fileName;
          break;
        case 3:
          fileName = `images/${fileLabel}/${fileLabel}_rev_iso.png`;
          this.vehicle.isoRev = fileName;
          break;
        case 4:
          fileName = `images/${fileLabel}/${fileLabel}_right.png`;
          this.vehicle.right = fileName;
          break;
        case 5:
          fileName = `images/${fileLabel}/${fileLabel}_licence_disc.png`;
          this.vehicle.licenceDisc = fileName;
          break;
      }
      const ref = this.storage.ref(fileName);
      const task = ref.put(file[0]);
      observarbles.push(task.snapshotChanges());
    });

    forkJoin(observarbles).subscribe({
      error: () => {
        this.toaster.danger(`Error with while verifying the following Vehicle ${fileLabel},
          Please try again`, 'Error:');
        spinnerSubscription.unsubscribe();
      },
      complete: () => {
        this.vehicle.atLeastOnePhotoUploaded = true;
        this.vehicle.verified = true;
        console.log('logging user', this.user);
        if (this.vehicle.isEdit){
          this.vehicle.editedByFirstName = this.user.firstName;
          this.vehicle.editedBySurname = this.user.surname;
          this.vehicle.editedByEmail = this.user.email;
          this.vehicle.dateEdited = new Date();
        }
        else {
          this.vehicle.verifiedByFirstName = this.user.firstName;
          this.vehicle.verifiedBySurname = this.user.surname;
          this.vehicle.verifiedByEmail = this.user.email;
          this.vehicle.dateVerified = new Date();
          this.vehicle.verified = true;
        }
        this.vehicleVerificationService.postVerifiedVehicleOnly(this.vehicle).then(() => {
          spinnerSubscription.unsubscribe();
          this.toaster.success(`${fileLabel} Photos were successfully Uploaded`, 'Success:');
          this.dialogRef.close();
        }).catch(() => {
          this.toaster.danger(`Error with while verifying the following Vehicle ${fileLabel},
                                Please try again`, 'Error:');
          spinnerSubscription.unsubscribe();
        });
      }
    });
  }

  onSubmitFrontImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[0] = file;
      this.fileCount++;
    }
  }

  onSubmitBackImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[1] = file;
      this.fileCount++;
    }
  }

  onSubmitFrontSideImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[2] = file;
      this.fileCount++;
    }
  }

  onSubmitBackSideImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[3] = file;
      this.fileCount++;
    }
  }

  onSubmitSideImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[4] = file;
      this.fileCount++;
    }
  }

  onSubmitLicenceDiskImage(file): void {
    if (file === false) {
      this.fileCount--;
    }
    else {
      this.files[5] = file;
      this.fileCount++;
    }
  }

  getPhotosImageUrl(): void{
    if ( this.vehicle.front && this.vehicle.front?.length > 0){
      const ref = this.storage.ref(this.vehicle.front);
      this.imageUrls[0] = ref.getDownloadURL();
    }
    if ( this.vehicle.back && this.vehicle.back?.length > 0){
      const ref = this.storage.ref(this.vehicle.back);
      this.imageUrls[1] = ref.getDownloadURL();
    }
    if (this.vehicle.iso && this.vehicle.iso?.length > 0){
      const ref = this.storage.ref(this.vehicle.iso);
      this.imageUrls[2] = ref.getDownloadURL();
    }
    if (this.vehicle.isoRev && this.vehicle.isoRev?.length > 0){
      const ref = this.storage.ref(this.vehicle.isoRev);
      this.imageUrls[3] = ref.getDownloadURL();
    }
    if (this.vehicle.right && this.vehicle.right?.length > 0){
      const ref = this.storage.ref(this.vehicle.right);
      this.imageUrls[4] = ref.getDownloadURL();
    }
    if (this.vehicle.licenceDisc && this.vehicle.licenceDisc?.length > 0){
      const ref = this.storage.ref(this.vehicle.licenceDisc);
      this.imageUrls[5] = ref.getDownloadURL();
    }
  }
}
