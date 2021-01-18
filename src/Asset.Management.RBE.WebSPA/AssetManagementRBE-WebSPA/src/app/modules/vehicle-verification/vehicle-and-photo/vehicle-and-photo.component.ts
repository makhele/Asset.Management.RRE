import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {IVehicle} from '../../shared/models/vehicle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NbToastrService} from '@nebular/theme';
import {VehicleVerificationService} from '../vehicle-verification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {ExtendedValidators} from '../../shared/functions/validators.extentions';
import {forkJoin, Subscription} from 'rxjs';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-vehicle-and-photo',
  templateUrl: './vehicle-and-photo.component.html',
  styleUrls: ['./vehicle-and-photo.component.scss']
})
export class VehicleAndPhotoComponent implements OnInit {

  vehicle: IVehicle;
  newVehicleVerificationForm: FormGroup;
  vehiclePhotos: FormGroup;
  files = new Array(6);
  fileCount = 0;
  imageUrls = new Array(6);
  regions = ['Motheo', 'Xhariep', 'Lejweleputswa', 'Fezile Dabi', 'Thabo Mofutsanyane', 'Thabo Mofutsanyane 2'];
  statuses = ['Active', 'Repair Pending', 'Under Repair', 'Consider Scrap', 'Consider Card Cancellation'];
  createdVehicle: IVehicle;

  @ViewChild(MatStepper) private stepper: MatStepper;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IVehicle, private vehicleVerificationService: VehicleVerificationService,
              public dialogRef: MatDialogRef<VehicleAndPhotoComponent>, public dialog: MatDialog, private fb: FormBuilder,
              private toaster: NbToastrService, private router: Router, private storage: AngularFireStorage,
              private readonly spinnerOverlayService: SpinnerOverlayService) {
    this.vehicle = this.data;
    if (this.vehicle.isEdit) {
      this.getPhotosImageUrl();
    }

  }

  ngOnInit(): void {
    this.newVehicleVerificationForm = this.fb.group({
      // Needed Inputs
      uid: [this.vehicle.uid, [Validators.required]],
      fleetNumber: [this.vehicle.fleetNumber, [Validators.required,
        // Validators.pattern(/^g[bcdfghjklmnpqrstvwxyz]{2}\d{3}fs$/i),
        Validators.minLength(7),
        Validators.maxLength(7), ExtendedValidators.noSpaces]],
      registrationNumber: [this.vehicle.registrationNumber, [Validators.required,
        // Validators.pattern(/^g[bcdfghjklmnpqrstvwxyz]{2}\d{3}fs$/i),
        Validators.minLength(8),
        Validators.maxLength(8), ExtendedValidators.noSpaces]],
      make: [this.vehicle.make,  [Validators.required]],
      model: [this.vehicle.model,  [Validators.required]],

      chassisNumber: [this.vehicle.chassisNumber, [Validators.required]],
      engineNumber: [this.vehicle.engineNumber, [Validators.required]],
      kmOrHourReading: [this.vehicle.kmOrHourReading,  [Validators.required]],
      region: [this.vehicle.region,  [Validators.required]],
      district: [this.vehicle.district,  [Validators.required]],
      client: [this.vehicle.client,  [Validators.required]],
      otherInstitutionName: [this.vehicle.otherInstitutionName],
      condition: [this.vehicle.condition,  [Validators.required]],
      status: [this.vehicle.status,  [Validators.required]],
      comments: [this.vehicle.comments],

    });
  }

  onSubmitVehicle(createdVehicle: IVehicle): void {
    createdVehicle.fleetNumber = createdVehicle.fleetNumber.toUpperCase();
    createdVehicle.registrationNumber = createdVehicle.registrationNumber.toUpperCase();
    createdVehicle.make = createdVehicle.make.toTitleCase();
    createdVehicle.model = createdVehicle.model.toTitleCase();
    createdVehicle.chassisNumber = createdVehicle.chassisNumber.toUpperCase();
    createdVehicle.engineNumber = createdVehicle.engineNumber.toUpperCase();
    createdVehicle.district = createdVehicle.district.toTitleCase();
    createdVehicle.validInput = true;
    this.createdVehicle = createdVehicle;
    this.stepper.next();
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
  onSubmitVehiclePhotos(): void {
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

        if (this.vehicle.isEdit){
          this.createdVehicle.dateEdited = new Date();
        }
        else {
          this.createdVehicle.dateVerified = new Date();
          this.createdVehicle.verified = true;
        }
        this.createdVehicle.atLeastOnePhotoUploaded = true;
        this.vehicleVerificationService.postVerifiedVehicleOnly(this.createdVehicle).then(() => {
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

}
