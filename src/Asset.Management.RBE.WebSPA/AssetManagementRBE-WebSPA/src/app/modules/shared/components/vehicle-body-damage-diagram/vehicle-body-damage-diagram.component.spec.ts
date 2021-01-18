/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehicleBodyDamageDiagramComponent } from './vehicle-body-damage-diagram.component';

describe('VehicleBodyDamageDiagramComponent', () => {
  let component: VehicleBodyDamageDiagramComponent;
  let fixture: ComponentFixture<VehicleBodyDamageDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBodyDamageDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBodyDamageDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
