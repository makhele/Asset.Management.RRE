import {Injectable, NgZone} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {PaginationService} from './pagination.service';


// Implementing a Retry-Circuit breaker policy
// is pending to do for the SPA app
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,  private paginationService: PaginationService, private toaster: NbToastrService) {
  }

  get(url: string, params?: any): Observable<any> {
    const options = { observe: 'response' as 'body'};
    this.setHeaders(options);
    url =
    `${url}` +
    `?page=${this.paginationService.page}&pageCount=${
      this.paginationService.pageCount}&query=${
        this.paginationService.query}`;
    return this.http.get(url, options)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        map((res: Response) => {
          this.paginationService.totalCount = JSON.parse(res.headers.get('X-Pagination'))?.totalCount;
          this.paginationService.query = '';
          return res.body;
        }),
        catchError(this.handleError)
      );
  }

  getById(url: string, params?: any): Observable<Response> {
    let options = { };
    this.setHeaders(options);

    return this.http.get(url, options)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  getPDF(url: string, params?: any): Observable<Response> {
    const options = {responseType: 'blob' as 'json'};
    this.setHeaders(options);

    return this.http.get(url, options)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  postWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, true, params);
  }

  post(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, false, params);
  }

  putWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPut(url, data, true, params);
  }

  private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options, needId);

    return this.http.post(url, data, options)
      .pipe(
        tap((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  delete(url: string, params?: any): void {
    const options = {};
    this.setHeaders(options);

    console.log('data.service deleting');

    this.http.delete(url, options)
      .subscribe((res) => {
        console.log('deleted');
      });
  }

  private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options, needId);

    return this.http.put(url, data, options)
      .pipe(
        tap((res: Response) => {

          return res;
        }),

        catchError(this.handleError)
      );
  }

  private handleError = (error: any) => {
    console.log(error.error);

    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side network error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('Backend - ' +
        `status: ${error.status}, ` +
        `title: ${error.title}, ` +
        `statusText: ${error.statusText}, ` +
        `message: ${error.error.message}`);
    }
    let errorMessage;
    if (error.error.title !== undefined) {
      errorMessage = error.error.title;
    } else {
      if (error.status === 0) {
        errorMessage = 'Cannot Connect to the Server';
      }
    }
    this.toaster.danger(errorMessage, 'Error:' );
    // this.snack.openSnackBar(error.error.title, 'OK', 'Error');
    // this.snackBar.open(error.error.title, ' OK', {
    //   verticalPosition: 'top',
    //   horizontalPosition: 'right',
    //   duration: 30000,
    // });
    // return an observable with a user-facing error message
    return throwError(error || 'server error');
  }

  private setHeaders(options: any, needId?: boolean): void {
    // if (needId && this.securityService) {
    //   options["headers"] = new HttpHeaders()
    //     .append('authorization', 'Bearer ' + this.securityService.GetToken())
    //     .append('x-requestid', Guid.newGuid());
    // }
    // else if (this.securityService) {
    //   options["headers"] = new HttpHeaders()
    //     .append('authorization', 'Bearer ' + this.securityService.GetToken());
    // }
  }
}
