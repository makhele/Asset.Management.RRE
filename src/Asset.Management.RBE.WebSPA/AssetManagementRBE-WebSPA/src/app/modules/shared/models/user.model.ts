export interface IUser{
    uid: string;
    password: string;
    firstName: string;
    surname: string;
    email: string;
    role: string;
    claim: string;
    policy: string;

    token?: string;
    theme: string;
}


export class UserKeys {
  static readonly USER_UID_KEY = 'uid';
}
