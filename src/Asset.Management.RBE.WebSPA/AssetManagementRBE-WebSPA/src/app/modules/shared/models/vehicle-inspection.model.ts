import {IVehicle} from './vehicle.model';

export interface IVehicleInspection {
  id: number;
  spare_Wheel_Tyre_Pressure: number;
  front_Wheels_Tyre_Pressure: number;
  rear_Wheels_Tyre_Pressure: number;
  exterior_Body: string;
  windshield: string;
  mirrors: string;
  wipers: string;
  exterior_Lights: string;
  interior_Lights: string;
  air_Conditioner: string;
  airbag: string;
  engine_Oil: string;
  brakes: string;
  brake_Fluid: string;
  antifreeze: string;
  battery_Charge: string;
  battery_Condition: string;
  battery_Connection: string;
  wheel_Bolts: string;
  vehicle_Body_Damage_DiagramDataUrl: string;
  inspected_By_SignatureDataUrl: string;
  inspected_By: string;
  inspection_Date: Date;
  updated_By: string;
  date_Updated: Date;
  vehicle: IVehicle;


}
