import {IAddress} from './address.model';

export interface IDepartment {
  id: number;
  department_Name: string;
  department_Code: string;
  physical_Address: IAddress;
  postal_Address: IAddress;
}
