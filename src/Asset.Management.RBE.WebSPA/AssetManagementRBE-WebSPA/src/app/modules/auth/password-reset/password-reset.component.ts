import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {NbToastrService} from '@nebular/theme';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {RoutePaths} from '../../shared/utils/route-paths';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  routPaths: RoutePaths;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toaster: NbToastrService, private spinnerOverlayService: SpinnerOverlayService,
    public dialogRef: MatDialogRef<PasswordResetComponent>, public dialog: MatDialog,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('ruuning onsubmit');
    console.log('return Url', this.returnUrl);


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).then(data => {

      },
      error => {
        this.error = error;
        this.loading = false;
      });

    // this.vehicleVerificationService.postVerifiedVehicleOnly(createdVehicle).then(() => {
    //   spinnerSubscription.unsubscribe();
    //   this.toaster.success(`${this.vehicle.fleetNumber} was successfully verified`, 'Success:' );
    //   // this.router.navigate([RoutePaths.ASSET_VERIFICATION_VERIFIED ]);
    //   this.dialogRef.close();
    // }).catch(() => {
    //   this.toaster.default(`Error with while verifying the following Vehicle ${this.vehicle.fleetNumber}, Please try again`, 'Error:' );
    // });
  }

}
