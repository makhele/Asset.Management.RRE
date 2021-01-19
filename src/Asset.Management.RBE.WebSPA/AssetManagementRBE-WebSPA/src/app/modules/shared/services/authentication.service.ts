import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser, UserKeys} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {IVehicle, VehicleKeys} from '../models/vehicle.model';
import {CookieKey} from '../utils/route-paths';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  user: IUser;
  userId: string;
  constructor(private http: HttpClient, private auth: AngularFireAuth, private afs: AngularFirestore) {
      this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem(CookieKey.COOKIE_KEY)));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string): Promise<void> {

   return this.auth.signInWithEmailAndPassword(email, password).then((userFromAuth) => {
      const itemsCollection = this.afs.collection<IUser>('users', ref =>
        (ref.where(UserKeys.USER_UID_KEY, '==', userFromAuth.user.uid).limit(1)));
      console.log('itemsCollection', itemsCollection);
      console.log('userFromAuth.user.uid', userFromAuth.user.uid);
      itemsCollection.valueChanges().pipe(take(1)).subscribe({
        next: (users) => {
          this.user = users[0];

          localStorage.setItem(CookieKey.COOKIE_KEY, JSON.stringify(this.user));
          this.currentUserSubject.next(this.user);
          return this.user;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });





      // return this.http.post<any>(`/users/authenticate`, { email, password })
      //     .pipe(map(user => {
      //         // store user details and jwt token in local storage to keep user logged in between page refreshes
      //         localStorage.setItem('currentUser', JSON.stringify(user));
      //         this.currentUserSubject.next(user);
      //         return user;
      //     }));
  }

  logout(): void {
      // remove user from local storage to log user out
      localStorage.removeItem(CookieKey.COOKIE_KEY);
      this.currentUserSubject.next(null);
  }

  passwordRest(email){
    return this.auth.sendPasswordResetEmail(email);
  }
}
