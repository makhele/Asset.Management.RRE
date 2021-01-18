import {Component, OnInit, ViewChild} from '@angular/core';
import {VehicleVerificationService} from '../vehicle-verification.service';
import {MatDialog} from '@angular/material/dialog';
import {PaginationService} from '../../shared/services/pagination.service';
import {IVehicle} from '../../shared/models/vehicle.model';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {VerifyVehicleOnlyComponent} from '../verify-vehicle-only/verify-vehicle-only.component';
import {ImageUploadOnlyComponent} from '../image-upload-only/image-upload-only.component';
import {VehicleAndPhotoComponent} from '../vehicle-and-photo/vehicle-and-photo.component';

@Component({
  selector: 'app-vehicle-verify',
  templateUrl: './vehicle-verify.component.html',
  styleUrls: ['./vehicle-verify.component.scss']
})
export class VehicleVerifyComponent implements OnInit {


  constructor(private vehicleVerificationService: VehicleVerificationService, private paginationService: PaginationService,
              public dialog: MatDialog)
  { }

  vehicles: IVehicle[];
  displayedColumns: string[] = ['fleetNumber', 'registrationNumber', 'make', 'model', 'Actions'];
  dataSource: MatTableDataSource<IVehicle>;
  notFound = false;
  serverFilterValue: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IVehicle>;



  ngOnInit(): void {
    this.getVehiclesForVerification();
  }

  getVehiclesForVerification(): void {
    this.vehicleVerificationService.getVehiclesForVerification()
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.refreshTableData();
      });
  }


  openVerifyVehicleOnlyDialog(uid: string): void {
    const dialogRef = this.dialog.open(VerifyVehicleOnlyComponent, {
      data: this.vehicles.find(v => v.uid === uid)
    });

  }

  openImageUploadOnlyDialog(uid: string): void {
    const dialogRef = this.dialog.open(ImageUploadOnlyComponent, {
      data: this.vehicles.find(v => v.uid === uid)
    });
  }

  openVehicleAndImageDialog(uid: string): void {
    const dialogRef = this.dialog.open(VehicleAndPhotoComponent, {
      data: this.vehicles.find(v => v.uid === uid)
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

}
