import {Component, Inject, OnInit} from '@angular/core';
import {IVehicle} from '../../shared/models/vehicle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {VehicleVerificationService} from '../vehicle-verification.service';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {ExtendedValidators} from '../../shared/functions/validators.extentions';
import '../../shared/functions/string.extentions';
import {RoutePaths} from '../../shared/utils/route-paths';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'app-verify-vehicle-only',
  templateUrl: './verify-vehicle-only.component.html',
  styleUrls: ['./verify-vehicle-only.component.scss']
})
export class VerifyVehicleOnlyComponent implements OnInit {

  vehicle: IVehicle;
  user: IUser;
  newVehicleVerificationForm: FormGroup;
  regions = ['Motheo', 'Xhariep', 'Lejweleputswa', 'Fezile Dabi', 'Thabo Mofutsanyane', 'Thabo Mofutsanyane 2'];
  statuses = ['Active', 'Repair Pending', 'Under Repair', 'Consider Scrap', 'Consider Card Cancellation'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IVehicle, private vehicleVerificationService: VehicleVerificationService,
              public dialogRef: MatDialogRef<VerifyVehicleOnlyComponent>, public dialog: MatDialog, private fb: FormBuilder,
              private toaster: NbToastrService, private router: Router, private spinnerOverlayService: SpinnerOverlayService,
              private authenticationService: AuthenticationService){
    this.vehicle = this.data;

    this.authenticationService.currentUser.subscribe(user => this.user = user);


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

  onSubmit(createdVehicle: IVehicle): void {
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    createdVehicle.fleetNumber = createdVehicle.fleetNumber.toUpperCase();
    createdVehicle.registrationNumber = createdVehicle.registrationNumber.toUpperCase();
    createdVehicle.make = createdVehicle.make.toTitleCase();
    createdVehicle.model = createdVehicle.model.toTitleCase();
    createdVehicle.chassisNumber = createdVehicle.chassisNumber.toUpperCase();
    createdVehicle.engineNumber = createdVehicle.engineNumber.toUpperCase();
    createdVehicle.district = createdVehicle.district.toTitleCase();
    createdVehicle.validInput = true;
    if (this.vehicle.isEdit){
      createdVehicle.editedByFirstName = this.user.firstName;
      createdVehicle.editedBySurname = this.user.surname;
      createdVehicle.editedByEmail = this.user.email;
      createdVehicle.dateEdited = new Date();
    }
    this.vehicleVerificationService.postVerifiedVehicleOnly(createdVehicle).then(() => {
        spinnerSubscription.unsubscribe();
        this.toaster.success(`${this.vehicle.fleetNumber} was successfully verified`, 'Success:' );
      // this.router.navigate([RoutePaths.ASSET_VERIFICATION_VERIFIED ]);
        this.dialogRef.close();
    }).catch(() => {
      this.toaster.default(`Error with while verifying the following Vehicle ${this.vehicle.fleetNumber}, Please try again`, 'Error:' );
    });

    // if ((this.newVehicleInspectionForm.get('exterior_Body').value === 'warning' ||
    //   this.newVehicleInspectionForm.get('exterior_Body').value === 'error') &&
    //   this.newVehicleInspectionForm.get('vehicle_Body_Damage_DiagramDataUrl').value === '')
    // {
    //   this.toaster.success(`If the Exterior body is NOT Checked and Ok, you must "Note any existing Exterior Body damage or defects on the diagram"`, 'Error:', { duration: 10000 } );
    // }
    // else{
    //   const dialogRef = this.dialog.open(SignaturePadComponent, {
    //     disableClose : true
    //   });
    //   dialogRef.afterClosed().subscribe( signatureDataUrl => {
    //     if (signatureDataUrl === undefined){}
    //     else {
    //       this.newVehicleInspectionForm.get('inspected_By_SignatureDataUrl').setValue(signatureDataUrl);
    //       this.vehicleVerificationService.postVehicleInspection(this.newVehicleInspectionForm.value).subscribe((results) => {
    //         if (results) {
    //           this.toaster.success(`${this.vehicle.gG_Registration_Number} was successfully inspected`, 'Success:' );
    //           this.router.navigate([RoutePaths.VEHICLE_INSPECTED ]);
    //           this.dialogRef.close();
    //         }
    //       });
    //     }
    //   });
    // }
  }

  // openVehicleBodyDamageDiagram(): void {
  //   const dialogRef = this.dialog.open(VehicleBodyDamageDiagramComponent, {
  //     disableClose : true
  //   });
  //   dialogRef.afterClosed().subscribe( vehicleBodyDamageDiagramDataUrl => {
  //     if (vehicleBodyDamageDiagramDataUrl === undefined){}
  //     else {
  //       this.newVehicleInspectionForm.get('vehicle_Body_Damage_DiagramDataUrl').setValue(vehicleBodyDamageDiagramDataUrl);
  //
  //     }
  //   });
  //
  // }

}
