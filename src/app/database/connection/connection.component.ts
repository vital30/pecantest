import { Component, OnInit,Input } from '@angular/core';
import { iif } from 'rxjs';
import { DatabaseBarService } from '../../_services/database/database-bar.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(private dbService: DatabaseBarService) { }
  @Input() connections: string[] = [];
  shouldColsExpand = false;
  selectedTable: any;
  tabesData: any[] = [];
  dbNames: any[] = [];
  isTablesSectionExpanded = false;
  tableviewsIsopen = false;
  authorization = [2,4,6,8,10];

  ngOnInit(): void {
  }

    getTables(conectionName:any) {
      this.selectedTable = conectionName;
      if(this.selectedTable === conectionName && this.shouldColsExpand){
        this.shouldColsExpand = !this.shouldColsExpand;;
      }else if(this.tabesData.length!=0){
        this.expandTableCols(conectionName)
      }else{
        this.dbService.getTables().subscribe(data => {
          this.tabesData = data;
          for (let i=0; i<data.length; i++) {
            this.dbNames.push(data[i].name);
          }
          this.expandTableCols(conectionName)
        },
        err => {
          this.tabesData = [];
          this.selectedTable = undefined;
          this.shouldColsExpand = false;
          throw err;
        });
      }
      
    }
  

  expandTableCols(tableName: string) {
    this.selectedTable = tableName;
    this.shouldColsExpand = true;
  }
}

