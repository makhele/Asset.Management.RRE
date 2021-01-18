import { Injectable } from '@angular/core';
import {IVehicle, VehicleKeys} from '../shared/models/vehicle.model';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssetRegisterService {

  private itemsCollection: AngularFirestoreCollection<IVehicle>;

  constructor(private afs: AngularFirestore) {

  }

  getAllVehicles(): Observable<IVehicle[]> {
    this.itemsCollection = this.afs.collection<IVehicle>('vehicles', ref => ref.orderBy(VehicleKeys.FLEET_NUMBER_KEY, 'desc'));

    return  this.itemsCollection.valueChanges({ idField: 'uid' });

  }

}
