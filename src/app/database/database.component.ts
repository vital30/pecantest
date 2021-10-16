import { Component , OnInit } from '@angular/core';
import { DatabaseBarService} from '../_services/database/database-bar.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  databases:any[] = [];
  isTablesSectionExpanded = false;
  dbTables: any[] = [];
  tableviewsIsopen = false;
  connectionNames: any[] = [];
  databaseLoader = false;

  constructor(private dbService: DatabaseBarService) { }

  ngOnInit() {
    this.databaseLoader = true;
    this.getConnections();
  }

  getConnections() {
    this.dbService.getConnections().subscribe(data => {
        this.dbTables = data;
       for (let i=0; i<data.length; i++) {
         this.connectionNames.push(data[i].name);
       }
       this.updateTables(data[Object.keys(data)[0]]);
    },
    err => {
      this.updateTables([]);
      throw err;
    });
  }

  toggleTablesSection() {
    this.isTablesSectionExpanded = !this.isTablesSectionExpanded;
    this.tableviewsIsopen = !this.tableviewsIsopen;
  }

  updateTables(dbOption:any) {
    this.dbTables = [];
    if(dbOption){
      for (let i = 0; i < dbOption.length; i++) {
        this.dbTables.push(dbOption[i]);  
      }
    }
  }
}
