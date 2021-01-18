import { Injectable } from '@angular/core';
import {IVehicle, VehicleKeys} from '../shared/models/vehicle.model';
import {Observable} from 'rxjs';
import {DataService} from '../shared/services/data.service';
import {ConfigurationService} from '../shared/services/configuration.service';
import {tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleVerificationService {
  private vehiclesUrl = '';
  private itemsCollection: AngularFirestoreCollection<IVehicle>;

  constructor(private afs: AngularFirestore) {

  }

  getVehiclesForVerification(): Observable<IVehicle[]> {
    this.itemsCollection = this.afs.collection<IVehicle>('vehicles', ref =>
      (ref.where(VehicleKeys.VERIFIED_KEY, '==', false).orderBy(VehicleKeys.FLEET_NUMBER_KEY, 'desc')));

    return this.itemsCollection.valueChanges({ idField: 'uid' });

  }

  postVerifiedVehicleOnly(verifiedVehicle: IVehicle): Promise<void>{
    return this.afs.doc<IVehicle>(`vehicles/${verifiedVehicle.uid}`).update(verifiedVehicle);
  }

  getVerifiedVehicles(): Observable<IVehicle[]> {
    this.itemsCollection = this.afs.collection<IVehicle>('vehicles', ref =>
      (ref.where(VehicleKeys.VERIFIED_KEY, '==', true).orderBy(VehicleKeys.DATE_VERIFIED_KEY, 'desc')));

    return this.itemsCollection.valueChanges({ idField: 'uid' });

  }
  //
  //
  // getCheckedInVehicles(): Observable<IVehicleCheckIn[]> {
  //   let url = this.vehiclesUrl + '/checkin';
  //   return this.service.get(url).pipe<IVehicleCheckIn[]>(tap((response: any) => {
  //     return response;
  //   }));
  // }
  //
  //
  // putVehicleCheckin(vehicleCheckIn: IVehicleCheckIn): Observable<IVehicleCheckIn>  {
  //   let url = this.vehiclesUrl + '/checkin/' + vehicleCheckIn.id.toString();
  //   return this.service.putWithId(url, vehicleCheckIn).pipe<IVehicleCheckIn>(tap((response: any) => {
  //     return response;
  //   }));
  // }

}
