import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-cols',
  templateUrl: './table-cols.component.html',
  styleUrls: ['./table-cols.component.css']
})
export class TableColsComponent implements OnInit {

  @Input() columns:any[] = [];

  constructor() { }

  ngOnInit() {  
  }



}
