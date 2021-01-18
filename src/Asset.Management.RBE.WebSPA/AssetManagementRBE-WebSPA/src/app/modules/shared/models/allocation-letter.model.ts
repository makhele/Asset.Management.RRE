import {IVehicle} from './vehicle.model';
import {IDepartment} from './department.model';

export interface IAllocationLetter {

    id: number;
    allocation_Number: string;
    departmentId: number;
    allocation_Date: Date;
    allocated_By: string;
    allocated_By_SignatureDataUrl: string;
    department: IDepartment;
    allocationLetterToVehicles: IAllocationLetterToVehicles[];
}

export interface IAllocationLetterToVehicles{
    vehicle: IVehicle;
}
