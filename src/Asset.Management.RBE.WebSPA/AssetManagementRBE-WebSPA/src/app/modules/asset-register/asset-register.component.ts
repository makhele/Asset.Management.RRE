import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IVehicle} from '../shared/models/vehicle.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PaginationService} from '../shared/services/pagination.service';
import {VehicleVerificationService} from '../vehicle-verification/vehicle-verification.service';
import {VehicleDetailComponent} from './vehicle-detail/vehicle-detail.component';
import {AssetRegisterService} from './asset-register.service';

@Component({
  selector: 'app-asset-register',
  templateUrl: './asset-register.component.html',
  styleUrls: ['./asset-register.component.scss']
})
export class AssetRegisterComponent implements OnInit {

  constructor(private assetRegisterService: AssetRegisterService,  public dialog: MatDialog) { }

  vehicles: IVehicle[];
  displayedColumns: string[] = ['fleetNumber', 'registrationNumber', 'make', 'model', 'region', 'district', 'client', 'Actions'];
  dataSource: MatTableDataSource<IVehicle>;
  notFound = false;
  serverFilterValue: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IVehicle>;



  ngOnInit(): void {
    this.getVerifiedVehicles();
  }

  getVerifiedVehicles(): void {
    this.assetRegisterService.getAllVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.refreshTableData();
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
    if (this.dataSource.filter === '' || this.dataSource.filteredData.length > 0) {
      this.notFound = false;
    }
    else if (this.dataSource.filteredData.length === 0) {
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
    this.dataSource.filterPredicate = (data, filter: string) => {
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
