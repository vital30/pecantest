import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TablesComponent} from './tables.component';
import {TableColsComponent} from '../table-cols/table-cols.component';
import {Observable, of, throwError} from 'rxjs';
import {DatabaseBarService} from '../../_services/database/database-bar.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

const firstTable = 'account';
const secondTable = 'party';
const firstTableCols = [{'name':'partyKey','type':'string'}];
const secondTableCols = [{'name':'accountKey','type':'string'}];
const mockTables = [firstTable, secondTable];


class MockDatabaseService {

  getTableCols(tableName: string): Observable<any> {
    const mockCols = (tableName === firstTable) ? firstTableCols : secondTableCols;
    return of({'name':tableName,'columns':mockCols});
  }

}

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;
  let firstTableEle: DebugElement;
  let secondTableEle: DebugElement;
  let dbServiceDependency: DatabaseBarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TablesComponent,
        TableColsComponent
      ],
      providers: [
        { provide: DatabaseBarService, useClass: MockDatabaseService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    dbServiceDependency = TestBed.get(DatabaseBarService);
    component.tables = mockTables; // simulation input initialization by parent DatabaseComponent
    fixture.detectChanges();
    firstTableEle = fixture.debugElement.query(By.css('#table0account'));
    secondTableEle = fixture.debugElement.query(By.css('#table1party'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the selected table and its data types', fakeAsync(() => {
    expect(component.shouldColsExpand).toBeFalsy();
    expect(component.cache).toEqual([]);
    firstTableEle.triggerEventHandler('click', null);
    tick(); // clicking the first table fetches its column data types
    expect(component.shouldColsExpand).toBeTruthy();
    firstTableEle.triggerEventHandler('click', null);
    tick(); // clicking the first table again simply hides the table columns view
    expect(component.shouldColsExpand).toBeFalsy();
    secondTableEle.triggerEventHandler('click', null);
    tick(); // clicking on another table fetches the new table columns and replaces the previous table columns
    expect(component.shouldColsExpand).toBeTruthy();
     expect(component.cache).toBeTruthy();
    const spyGetTableCols = spyOn(dbServiceDependency, 'getTableCols');
    firstTableEle.triggerEventHandler('click', null);
    tick(); // clicking the first table now loads columns from the cache instead of making an API call
    expect(spyGetTableCols).toHaveBeenCalledTimes(0);
    expect(component.shouldColsExpand).toBeTruthy();
    expect(component.cache).toBeTruthy();
  }));

  it('should handle failed service method', fakeAsync(() => {
    expect(component.shouldColsExpand).toBeFalsy();
    expect(component.cache).toEqual([]);
    firstTableEle.triggerEventHandler('click', null);
    tick();
    expect(component.shouldColsExpand).toBeTruthy();
    spyOn(dbServiceDependency, 'getTableCols').and.callFake(() => throwError(new Error('fake error')));
    secondTableEle.triggerEventHandler('click', null);
    tick(); // service call fails and causes hiding of columns view but cache remains unaffected
    expect(component.shouldColsExpand).toBeFalsy();
    expect(component.cache).toBeTruthy();
    firstTableEle.triggerEventHandler('click', null);
    tick(); // load from cache still works
    expect(component.shouldColsExpand).toBeTruthy();
    expect(component.cache).toBeTruthy();
  }));

});
