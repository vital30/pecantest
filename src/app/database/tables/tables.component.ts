import {Component, Input, OnInit} from '@angular/core';
import { DatabaseBarService } from '../../_services/database/database-bar.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  @Input() tables: string[] = [];
  selectedTable: any;
  shouldColsExpand = false;
  tableCols: any[] = [];
  dbColNames: any[] = [];


  constructor(private dbService: DatabaseBarService) { }

  ngOnInit() {
  }

  updateSelectedTable(tableName: string) {   
    if (this.selectedTable === tableName && this.shouldColsExpand) {
      this.shouldColsExpand = !this.shouldColsExpand;
    } else if (this.tableCols.length!=0) {
      this.expandTableCols(tableName);
    } else {
      this.dbService.getTableCols().subscribe(data => {
        this.tableCols = data;
          for (let i=0; i<data.length; i++) {
            this.dbColNames.push(data[i].name);
          }
          this.expandTableCols(tableName);
        },
        err => {
          this.tableCols = [];
          this.selectedTable = undefined;
          this.shouldColsExpand = false;
          throw err;
        }
      );
    }
  }

  expandTableCols(tableName: string) {
    this.selectedTable = tableName;
    this.shouldColsExpand = true;
  }
}
