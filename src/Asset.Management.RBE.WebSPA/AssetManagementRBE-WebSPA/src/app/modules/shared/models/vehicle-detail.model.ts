import { IVehicle } from './vehicle.model';

export interface IVehicleDetail {

  id: number;

  vehicleCategoryClassId: number;
  vehicleColourId: number;
  tare: number;
  gvm: number;
  engine_Capacity: number;
  tank_Capacity: number;
  fuel_Type: string;
  year_Life: number;
  kM_Life: number;
  vehicle: IVehicle;
  
  vehicleNatisDocuments: IVehicleNatisDocuments;
  vehicleColour: IVehicleColour;
  vehicleCategoryClass: IVehicleCategoryClass;
}
export interface IVehicleNatisDocuments {
  id: number;
  file_Name: string;
  location: string;
  note: string;
  size: number;
}

export interface IVehicleColour{
  id: number;
  name: string;
}
export interface IVehicleCategoryClass {
  id: number;
  vehicleCategoryId: number;
  vehicleClassId: number;
  vehicleCategory: IVehicleCategory;
  vehicleClass: IVehicleClass;
}

export interface IVehicleCategory {
  id: number;
  name: string;
}
export interface IVehicleClass {
  id: number;
  name: string;
}
