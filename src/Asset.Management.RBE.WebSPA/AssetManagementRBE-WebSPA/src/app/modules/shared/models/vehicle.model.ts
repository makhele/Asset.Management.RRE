import { IDepartment } from './department.model';
import { IVehicleOrder } from './vehicle-order.model';
import { IVehicleDetail } from './vehicle-detail.model';
import {IVehicleCheckIn} from './vehicle-check-in.model';
import {IVehicleInspection} from './vehicle-inspection.model';

export interface IVehicle {

  uid: string;
  fleetNumber: string;
  registrationNumber: string;
  make: string;
  model: string;
  engineNumber: string;
  chassisNumber: string;
  kmOrHourReading: number;
  region: string;
  district: string;
  client: string;
  otherInstitutionName: string;
  condition: string;
  status: string;
  comments: string;
  verified: boolean;
  verifiedByFirstName: string;
  verifiedBySurname: string;
  verifiedByEmail: string;
  dateVerified: any;
  editedByFirstName: string;
  editedBySurname: string;
  editedByEmail: string;
  dateEdited: any;
  newAddition: boolean;
  front: string;
  back: string;
  iso: string;
  isoRev: string;
  right: string;
  licenceDisc: string;
  validInput: boolean;
  atLeastOnePhotoUploaded: boolean;
  isEdit: boolean;
}

export class VehicleKeys {
  static readonly FLEET_NUMBER_KEY = 'fleetNumber';
  static readonly REGISTRATION_NUMBER_KEY = 'registrationNumber';
  static readonly MAKE_KEY = 'make';
  static readonly MODEL_KEY = 'model';
  static readonly ENGINE_NUMBER_KEY = 'engineNumber';
  static readonly CHASSIS_NUMBER_KEY = 'chassisNumber';
  static readonly KM_OR_HOUR_READING_KEY = 'kmOrHourReading';
  static readonly REGION_KEY = 'region';
  static readonly DISTRICT_KEY = 'district';
  static readonly CLIENT_KEY = 'client';
  static readonly OTHER_INST_NAME_KEY = 'otherInstitutionName';
  static readonly CONDITION_KEY = 'equipmentCondition';
  static readonly STATUS_KEY = 'equipmentStatus';
  static readonly COMMENTS_KEY = 'comments';
  static readonly VERIFIED_KEY = 'verified';

  static readonly NEW_ADDITION_KEY = 'newAddition';

  static readonly VERIFIED_BY_FIRST_NAME_KEY = 'verifiedByName';
  static readonly VERIFIED_BY_SURNAME_KEY = 'verifiedBySurname';
  static readonly VERIFIED_BY_EMAIL_KEY = 'verifiedByEmail';
  static readonly DATE_VERIFIED_KEY = 'dateVerified';

  static readonly EDITED_BY_FIRST_NAME_KEY = 'editedByFirstName';
  static readonly EDITED_BY_SURNAME_KEY = 'editedBySurname';
  static readonly EDITED_BY_EMAIL_KEY = 'editedByEmail';
  static readonly DATE_EDITED_KEY = 'dateEdited';

  static readonly FRONT_KEY = 'front';
  static readonly BACK_KEY = 'back';
  static readonly ISO_KEY = 'iso';
  static readonly ISO_REV_KEY = 'isoRev';
  static readonly RIGHT_KEY = 'right';
  static readonly LICENCE_DISC_KEY = 'licenceDisc';
  static readonly VALID_INPUT = 'validInput';
  static readonly AT_LEAST_ONE_PHOTO_UPLOADED_KEY = 'atLeastOnePhotoUploaded';
}

