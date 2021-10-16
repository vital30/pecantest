import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DatabaseComponent } from './database.component';
import { TablesComponent } from './tables/tables.component';
import { TableColsComponent } from './table-cols/table-cols.component';
import { DatabaseBarService } from '../_services/database/database-bar.service';


const firstDb = 'app';
const secondDb = 'prf';
const mockDatabases = [firstDb, secondDb];
const mockTables = ['account', 'party'];

class MockDatabaseService {

  getDatabases(): Observable<string[]> {
    return of(mockDatabases);
  }

  getDatabaseTables(dbName: string): Observable<string[]> {
    return of(mockTables);
  }
}

describe('DatabaseComponent', () => {
  let component: DatabaseComponent;
  let dbServiceDependency: DatabaseBarService;
  let fixture: ComponentFixture<DatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatabaseComponent,
        TablesComponent,
        TableColsComponent
      ],
      providers: [
        { provide: DatabaseBarService, useClass: MockDatabaseService }
      ],
      imports: [ RouterTestingModule, AngularSvgIconModule, HttpClientTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]


    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseComponent);
    component = fixture.componentInstance;
    dbServiceDependency = TestBed.get(DatabaseBarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle a successful call of initDropdown()', () => {
    spyOn(dbServiceDependency, 'getDatabases').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.databases).toEqual([]);
    expect(component.dbTables).toEqual([]);
  });

  it('should handle a call of initDropdown() that yields no databases', () => {
    spyOn(dbServiceDependency, 'getDatabases').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.databases).toEqual([]);
    expect(component.selectedDatabase).toBeUndefined();
    expect(component.dbTables).toEqual([]);
  });

  it('should handle a call of initDropdown() that failed', () => {
    spyOn(dbServiceDependency, 'getDatabases').and.callFake(() => throwError(new Error('fake error')));
    fixture.detectChanges();
    expect(component.databases).toEqual([]);
    expect(component.selectedDatabase).toBeUndefined();
    expect(component.dbTables).toEqual([]);
  });

});
