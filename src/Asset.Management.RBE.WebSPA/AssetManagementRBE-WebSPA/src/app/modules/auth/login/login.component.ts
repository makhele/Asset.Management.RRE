import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutePaths} from '../../shared/utils/route-paths';
import {VerifyVehicleOnlyComponent} from '../../vehicle-verification/verify-vehicle-only/verify-vehicle-only.component';
import {PasswordResetComponent} from '../password-reset/password-reset.component';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  resetLInk =  RoutePaths.PASSWORD_RESET;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private spinnerOverlayService: SpinnerOverlayService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }


  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).then(data => {
        // window.location.reload();
      },
      error => {
        this.error = error;
        this.loading = false;
      });
    // window.location.reload();
      // .pipe(first())
      // .subscribe(
      //   data => {
      //     this.router.navigate([this.returnUrl]);
      //   },
      //   error => {
      //     this.error = error;
      //     this.loading = false;
      //   });
  }

}
