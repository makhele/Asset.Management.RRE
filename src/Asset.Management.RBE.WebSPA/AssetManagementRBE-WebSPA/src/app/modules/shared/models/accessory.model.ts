import {IVehicle} from './vehicle.model';

export interface IAccessory {
  id: number;
  name: string;
}

export interface AccessoryAndVehicles{
  accessory: IAccessory;
  vehicles: IVehicle[];
}

export interface IVehicleRequiredAccessory{
  vehicleId: number;
  accessoryId: number;
  vehicle: IVehicle;
}

export interface  AddRequired{
  accessoryId: number;
  vehicleIds: number [];
}

export interface IFittedAccessory{
  id: number;
  accessoryId: number;
  fitted_Accessory_Number: string;
  number_of_Vehicles_Fitted: number;
  merchant: string;
  unit_Price: number;
  accessory: IAccessory;
  fittedAccessoryInvoice: IFittedAccessoryInvoice;
}
export interface IFittedAccessoryInvoice{
  id: number;
  file_Name: string;
  location: string;
  note: string;
  size: number;
}

export interface FittedAccessoryAndVehicles{
  fittedAccessory: IFittedAccessory;
  vehicles: IVehicle[];
}

export interface IVehicleFittedAccessory{
  vehicleId: number;
  fittedAccessoryId: number;
  vehicle: IVehicle;
}

export interface  AddFitted{
  fittedAccessoryId: number;
  vehicleIds: number [];
}
