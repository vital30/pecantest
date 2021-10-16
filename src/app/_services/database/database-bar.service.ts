import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DatabaseBarService {
  selectedDatabase:any;
  constructor(private http: HttpClient) {}

  static readonly GET_conections_URL = '/assets/conections.json'; 
  static readonly GET_tables_URL = '/assets/tables.json'; 
  static readonly GET_columns_URL = '/assets/columns.json'; 
  GRIDDATA_URL = "";

  getConnections(): Observable<any> {
    const url = DatabaseBarService.GET_conections_URL;
    return this.http.get(url);
  }

  getTables(): Observable<any> {
    const url = DatabaseBarService.GET_tables_URL;
    return this.http.get(url);
  }

  getTableCols(): Observable<any> {
   const url = DatabaseBarService.GET_columns_URL;
    return this.http.get(url);
  }

}