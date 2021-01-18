import {Component, Inject, OnInit} from '@angular/core';
import {IVehicle} from '../../shared/models/vehicle.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NbToastrService} from '@nebular/theme';
import {VehicleVerificationService} from '../vehicle-verification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  vehicle: IVehicle;
  id: number;
  created;
  edited;
  imagesLoaded: boolean;
  imageUrls = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IVehicle, private storage: AngularFireStorage) {
    this.vehicle = data;
    this.created = new Date(0).setUTCSeconds(this.vehicle.dateVerified?.seconds);
    this.edited = new Date(0).setUTCSeconds(this.vehicle.dateEdited?.seconds);
  }

  ngOnInit(): void {
  }

  getVehicleDeatailById(id: number){
    // this.vehicleVerificationService.getVehicleDetailById(id)
    //   .subscribe(vehicleDeatil => {
    //     this.vehicle.vehicleDetail = vehicleDeatil;
    //   });
  }

  downloadVehiclePhotos(): void {
    this.getImagesImageUrl();
    this.imagesLoaded = true;
  }
  getImagesImageUrl(): void{
    if ( this.vehicle.front && this.vehicle.front?.length > 0){
      const ref = this.storage.ref(this.vehicle.front);
      this.imageUrls.push(ref.getDownloadURL());
    }
    if ( this.vehicle.back && this.vehicle.back?.length > 0){
      const ref = this.storage.ref(this.vehicle.back);
      this.imageUrls.push(ref.getDownloadURL());
    }
    if (this.vehicle.iso && this.vehicle.iso?.length > 0){
      const ref = this.storage.ref(this.vehicle.iso);
      this.imageUrls.push(ref.getDownloadURL());
    }
    if (this.vehicle.isoRev && this.vehicle.isoRev?.length > 0){
      const ref = this.storage.ref(this.vehicle.isoRev);
      this.imageUrls.push(ref.getDownloadURL());
    }
    if (this.vehicle.right && this.vehicle.right?.length > 0){
      const ref = this.storage.ref(this.vehicle.right);
      this.imageUrls.push(ref.getDownloadURL());
    }
    if (this.vehicle.licenceDisc && this.vehicle.licenceDisc?.length > 0){
      const ref = this.storage.ref(this.vehicle.licenceDisc);
      this.imageUrls.push(ref.getDownloadURL());
    }
  }

}
