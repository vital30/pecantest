import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColsComponent } from './table-cols.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

const firstCol = 'partyKey';
const secondCol = 'partyName';
const thirdCol = 'partyType';
const dataType = 'string';
const tableCols = [ {firstCol: dataType}, {secondCol:dataType}, {thirdCol: dataType }];

describe('TableColsComponent', () => {
  let component: TableColsComponent;
  let fixture: ComponentFixture<TableColsComponent>;
  let colList: DebugElement;
  let firstColEle: DebugElement;
  let secondColEle: DebugElement;
  let thirdColEle: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
