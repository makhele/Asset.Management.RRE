/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import {NbIconLibraries, NbMenuItem, NbToastrService} from '@nebular/theme';
import {RoutePaths} from './modules/shared/utils/route-paths';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AuthenticationService} from './modules/shared/services/authentication.service';
import {Router} from '@angular/router';
import {IUser} from './modules/shared/models/user.model';
import {ConnectionService} from 'ng-connection-service';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'app-root',
  template:
  `
  <mat-progress-bar mode="determinate" [value]="loader.value$ | async"></mat-progress-bar>
  <ngx-one-column-layout *ngIf="currentUser; else elseBlock">
    <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
    <router-outlet>
    </router-outlet>
  </ngx-one-column-layout>
  <ng-template #elseBlock><app-login></app-login></ng-template>
  `,
})
export class AppComponent implements OnInit {
  menu = MENU_ITEMS;
  currentUser: IUser;
  constructor(private iconLibraries: NbIconLibraries,  public loader: LoadingBarService, private router: Router,
              private authenticationService: AuthenticationService, private toaster: NbToastrService,
              private connectionService: ConnectionService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('material-icons');
    this.connectionService.monitor().subscribe(isConnected => {
      if (!isConnected) {
        this.toaster.danger('You are not connected to the internet, some feature might not work', 'No Internet',
          {duration: 3000000, destroyByClick: false, hasIcon: true, icon: 'wifi-off-outline'});
      }
    });
    // this.iconLibraries.setDefaultPack('font-awesome');
  }

  ngOnInit(): void {
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: {icon: 'home-outline' },
    link: '/'
  },
  {
    title: 'Asset Register',
    icon: {icon: 'clipboard-list', pack: 'font-awesome' },
    link: `/${RoutePaths.ASSET_REGISTER}`
  },
  {
    title: 'Asset Verification',
    icon: {icon: 'shield-alt', pack: 'font-awesome'},
    children: [
      {
        title: 'Verify Vehicle',
        icon: {icon: 'notes-medical', pack: 'font-awesome'},
        link: `/${RoutePaths.ASSET_VERIFICATION_VERIFY}`
      },
      {
        title: 'Verified Vehicles',
        icon: {icon: 'clipboard-check', pack: 'font-awesome'},
        link: `/${RoutePaths.ASSET_VERIFICATION_VERIFIED}`
      },
      // {
      //   title: 'Verified but Incomplete',
      //   icon: {icon: 'clipboard-list', pack: 'font-awesome'},
      //   link: `/${RoutePaths.ASSET_VERIFICATION_VERIFIED}`
      // },
      // {
      //   title: 'Vehicles Not Verified',
      //   icon: {icon: 'list', pack: 'font-awesome'},
      //   link: `/${RoutePaths.ASSET_VERIFICATION_VERIFIED}`
      // },
    ]
  },
  {
    title: 'Equipment Transfer',
    icon: {icon: 'exchange-alt', pack: 'font-awesome'},
    badge: {
      text: 'soon',
      status: 'danger',

    },
    children: [
    ]
  },
  {
    title: 'Equipment Pool',
    icon: {icon: 'building', pack: 'font-awesome'},
    badge: {
      text: 'soon',
      status: 'danger'

    },
    children: [
    ]
  },
  {
    title: 'Asset Location',
    icon: {icon: 'search', pack: 'font-awesome'},
    badge: {
      text: 'soon',
      status: 'danger',

    },
    children: [
    ]
  },
  {
    title: 'Asset Location',
    icon: {icon: 'map-marked-alt', pack: 'font-awesome'},
    badge: {
      text: 'soon',
      status: 'danger',

    },
    children: [
    ]
  }



  // {
  //   title: 'Vehicles',
  //   icon: {icon: 'car', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   children: [
  //     {
  //       title: 'View Unallocated Vehicles',
  //       link: `/${RoutePaths.VEHICLES_UNALLOCATED}`
  //     },
  //     {
  //       title: 'View Allocated Vehicles',
  //       link: `/${RoutePaths.VEHICLES_ALLOCATED}`
  //     },
  //     {
  //       title: 'View All Vehicles',
  //       link: `/${RoutePaths.VEHICLES_ALL}`
  //     },
  //   ]
  // },

  // {
  //   title: 'Vehicle Actions',
  //   group: true,
  // },
  // {
  //   title: 'Add New Vehicle',
  //   icon: {icon: 'plus', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   link: `/${RoutePaths.VEHICLE_NEW}`
  // },
  // {
  //   title: 'Vehicle Preparation Checklist',
  //   icon: {icon: 'tasks', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   link: `/${RoutePaths.VEHICLE_ACTIONS_PREPARATION_CHECKLIST}`
  // },
  // {
  //   title: 'Submit For Licensing',
  //   icon: {icon: 'paper-plane', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   link: `/${RoutePaths.VEHICLE_ACTIONS_SUBMIT_LICENSING}`
  // },
  // {
  //   title: 'Allocate Vehicles',
  //   icon: {icon: 'file-signature', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   link: `/${RoutePaths.VEHICLE_ACTIONS_ALLOCATE}`
  // },
  // {
  //   title: '',
  //   group: false,
  // },
  // {
  //   title: 'P18 Management',
  //   icon: {icon: 'clipboard', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   children: [
  //     {
  //       title: 'Open New P18',
  //       link: `/${RoutePaths.P18_NEW_OPEN}`
  //     },
  //     {
  //       title: 'View Open P18\'s',
  //       link: `/${RoutePaths.P18_OPEN}`
  //     },
  //     {
  //       title: 'View Closed P18\'s',
  //       link: `/${RoutePaths.P18_CLOSED}`
  //     },
  //     {
  //       title: 'View All P18\'s',
  //       link: `/${RoutePaths.P18_ALL}`
  //     },
  //   ]
  // },
  // {
  //   title: 'Vehicle Accessories',
  //   icon: {icon: 'tools', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   children: [
  //     {
  //       title: 'Required Accessories',
  //       link: `/${RoutePaths.VEHICLE_ACCESSORIES_REQUIRED}`
  //     },
  //     {
  //       title: 'Fitted Accessories',
  //       link: `/${RoutePaths.VEHICLE_ACCESSORIES_FITTED}`
  //     },
  //   ]
  // },
  // {
  //   title: '',
  //   group: true,
  // },
  // {
  //   title: 'Other Actions',
  //   group: true,
  // },
  // {
  //   title: 'Allocation Letter',
  //   icon: {icon: 'envelope-open-text', pack: 'font-awesome'},
  //   pathMatch: 'prefix',
  //   link: `/${RoutePaths.OTHER_ACTIONS_ALLOCATION_LETTER}`
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
];
