import {Component, OnInit, ViewChild} from '@angular/core';
import {VehicleVerificationService} from '../vehicle-verification.service';
import {PaginationService} from '../../shared/services/pagination.service';
import {MatDialog} from '@angular/material/dialog';
import {IVehicle} from '../../shared/models/vehicle.model';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {VerifyVehicleOnlyComponent} from '../verify-vehicle-only/verify-vehicle-only.component';
import {ImageUploadOnlyComponent} from '../image-upload-only/image-upload-only.component';
import {VehicleAndPhotoComponent} from '../vehicle-and-photo/vehicle-and-photo.component';
import {VehicleDetailComponent} from '../vehicle-detail/vehicle-detail.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {AssetVerificationPdfGenerator} from '../../shared/pdf-generators/asset-verification.pdf.generator';
import {AngularFireStorage} from '@angular/fire/storage';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpinnerOverlayService} from '../../../@theme/components/spinner-overlay/spinner-overlay.service';
import {NbToastrService} from '@nebular/theme';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-verified-vehicles',
  templateUrl: './verified-vehicles.component.html',
  styleUrls: ['./verified-vehicles.component.scss']
})
export class VerifiedVehiclesComponent implements OnInit {


  constructor(private vehicleVerificationService: VehicleVerificationService, private storage: AngularFireStorage, public dialog: MatDialog,
              private http: HttpClient,  private readonly spinnerOverlayService: SpinnerOverlayService, private toaster: NbToastrService, )
  { }

  vehicles: IVehicle[];
  displayedColumns: string[] = ['fleetNumber', 'registrationNumber', 'make', 'model', 'validInput', 'atLeastOnePhotoUploaded', 'verificationForm' , 'Actions'];
  dataSource: MatTableDataSource<IVehicle>;
  notFound = false;
  serverFilterValue: string;
  imagesLoaded: boolean;
  imageUrlsObservables: Observable<Blob>[] = [];
  imageUrls = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IVehicle>;



  ngOnInit(): void {
    this.getVerifiedVehicles();
  }

  getVerifiedVehicles(): void {
    this.vehicleVerificationService.getVerifiedVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.refreshTableData();
      });
  }


  openVerifyVehicleOnlyDialog(uid: string): void {
    const vehicle = this.vehicles.find(v => v.uid === uid);
    vehicle.isEdit = true;
    const dialogRef = this.dialog.open(VerifyVehicleOnlyComponent, {
      data: vehicle
    });

  }

  openImageUploadOnlyDialog(uid: string): void {
    const vehicle = this.vehicles.find(v => v.uid === uid);
    vehicle.isEdit = true;
    const dialogRef = this.dialog.open(ImageUploadOnlyComponent, {
      data: vehicle
    });
  }

  openVehicleAndImageDialog(uid: string): void {
    const vehicle = this.vehicles.find(v => v.uid === uid);
    vehicle.isEdit = true;
    const dialogRef = this.dialog.open(VehicleAndPhotoComponent, {
      data: vehicle
    });
  }

  openVehicleDetailDialog(uid: string): void {
    const vehicle = this.vehicles.find(v => v.uid === uid);
    vehicle.isEdit = true;
    const dialogRef = this.dialog.open(VehicleDetailComponent, {
      data: vehicle
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filter === '' || this.dataSource.filteredData.length > 0){
      this.notFound = false;
    }
    else if (this.dataSource.filteredData.length === 0){
      this.serverFilterValue = filterValue.trim().toLowerCase();
      this.notFound = true;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  nestedFilterCheck(search, data, key): any {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }


  refreshTableData(): void {
    this.dataSource = new MatTableDataSource<IVehicle>(this.vehicles);
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  downloadVerificationForm(uid: string): void {
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    this.imageUrlsObservables = [];
    const vehicle = this.vehicles.find(al => al.uid === uid);
    this.getImagesImageUrl(vehicle);
    forkJoin(this.imageUrlsObservables).toPromise().then(listOfUrls => {

      const DataUrilsObser = [];
      listOfUrls.forEach(url => {
        DataUrilsObser.push( this.getBase64ImageFromURL(url));
      });
      forkJoin(DataUrilsObser).toPromise().then((listofDatauris) => {
        pdfMake.createPdf(AssetVerificationPdfGenerator.getPdf(vehicle, listofDatauris)).open();
        spinnerSubscription.unsubscribe();
      }).catch((err) => {
          this.toaster.danger(err, 'Error:');
          spinnerSubscription.unsubscribe();
      }
      );
      }
    ).catch((err) => {
      this.toaster.danger(err, 'Error:');
      spinnerSubscription.unsubscribe();
    });


  }
  getImagesImageUrl(vehicle: IVehicle): void{
    if ( vehicle.front && vehicle.front?.length > 0){
      const ref = this.storage.ref(vehicle.front);
      this.imageUrlsObservables.push(ref.getDownloadURL());

    }
    if ( vehicle.back && vehicle.back?.length > 0){
      const ref = this.storage.ref(vehicle.back);
      this.imageUrlsObservables.push(ref.getDownloadURL());

    }
    if (vehicle.iso && vehicle.iso?.length > 0){
      const ref = this.storage.ref(vehicle.iso);
      this.imageUrlsObservables.push(ref.getDownloadURL());

    }
    if (vehicle.isoRev && vehicle.isoRev?.length > 0){
      const ref = this.storage.ref(vehicle.isoRev);
      this.imageUrlsObservables.push(ref.getDownloadURL());
    }
    if (vehicle.right && vehicle.right?.length > 0){
      const ref = this.storage.ref(vehicle.right);
      this.imageUrlsObservables.push(ref.getDownloadURL());
    }
    if (vehicle.licenceDisc && vehicle.licenceDisc?.length > 0){
      const ref = this.storage.ref(vehicle.licenceDisc);
      this.imageUrlsObservables.push(ref.getDownloadURL());
    }
  }


  getBase64ImageFromURL(url): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

}
