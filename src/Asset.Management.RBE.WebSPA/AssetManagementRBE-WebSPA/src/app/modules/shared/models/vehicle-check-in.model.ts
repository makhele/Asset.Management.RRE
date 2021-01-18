import {IVehicle} from './vehicle.model';

export interface IVehicleCheckIn {
  id: number;
  ref_No: string;
  department_Name: string;
  km: number;
  key: boolean;
  wheel_Spanner: boolean;
  jack_and_Handle: boolean;
  spare_Wheel: boolean;
  reason: string;
  driver_Name: string;
  driver_ID_Num: string;
  driver_Tel_Number: string;
  driver_Cell_Number: string;
  driver_Email_Address: string;
  towed_In: boolean;
  tow_In_Company_Name: string;
  tow_In_Company_Tel_Number: string;
  checked_Out: boolean;
  check_In_Date: Date;
  check_Out_Date: Date;
  checked_In_By: string;
  vehicle: IVehicle;
}
