import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private paginationModel: PaginationModel;
  public query = '';
  public totalCount: number;

  constructor() {
    this.paginationModel = new PaginationModel();
  }

  get page(): number {
    return this.paginationModel.pageIndex;
  }

  get selectItemsPerPage(): number[] {
    return this.paginationModel.selectItemsPerPage;
  }

  get pageCount(): number {
    return this.paginationModel.pageSize;
  }
  change(pageEvent: PageEvent): void {
    this.paginationModel.pageIndex = pageEvent.pageIndex + 1;
    this.paginationModel.pageSize = pageEvent.pageSize;
    this.paginationModel.allItemsLength = pageEvent.length;
  }
  changeWith(pageIndex: number, pageSize: number, length: number): void {
    this.paginationModel.pageIndex = pageIndex + 1;
    this.paginationModel.pageSize = pageSize;
    this.paginationModel.allItemsLength = length;
  }


}
