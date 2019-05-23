import { DashboardDataService } from './../services/dashboard-data.service';
import { LoginComponent } from './../login/login.component';

import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  
})
export class SuperAdminComponent implements OnInit {
  displayedColumns: string[] = ['cust_id', 'name', 'contact', 'email', 'sites','energyConsume', 'savedEnergy'];
  custTab = JSON.parse(sessionStorage.getItem("myValue"));
  dataSource = new MatTableDataSource<PeriodicElement>(this.custTab);
  isCollapsed : boolean = true;
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dashData:DashboardDataService) {
    console.log("Aagaya data :", this.custTab);
    
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  title = 'chart';
  type = 'stackedcolumn2d';
  dataFormat = 'json';
  dataSource23 = data;
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    console.log("Table Ka Click", "gkgkgkgkgk");
  }

  getRecord(row){
    console.log("2n Table Row clicked : ",row);
  }
  }         
  
  
  
  const data = {
  "chart": {
  "caption": "Energy Saving Rate",
  "subcaption": " ",
  "numbersuffix": " KWh",
  "showsum": "1",
  "plottooltext": "$label produces <b>$dataValue</b> of energy from $seriesName",
  "theme": "fusion",
  "drawcrossline": "1",
  "bgColor": "",
  "bgAlpha": "10"
  },
  "categories": [
  {
  "category": [
    {
      "label": "Customer_101"
    },
    {
      "label": "Customer_102"
    },
    {
      "label": "Customer_103"
    },
    {
      "label": "Customer_104"
    },
    {
      "label": "Customer_105"
    },
    {
      "label": "Customer_106"
    }
  ]
  }
  ],
  "dataset": [
  {
  "seriesname": "Site-Noida",
  "data": [
    {
      "value": "0"
    },
    {
      "value": "830"
    },
    {
      "value": "500"
    },
    {
      "value": "420"
    },
    {
      "value": "790"
    },
    {
      "value": "380"
    }
  ]
  },
  {
  "seriesname": "Site-Delhi",
  "data": [
    {
      "value": "350"
    },
    {
      "value": "620"
    },
    {
      "value": "410"
    },
    {
      "value": "370"
    },
    {
      "valu e": "720"
    },
    {
      "value": "310"
    }
  ]
  },
  {
  "seriesname": "Site-Gurgaon",
  "data": [
    {
      "value": "210"
    },
    {
      "value": "400"
    },
    {
      "value": "450"
    },
    {
      "value": "180"
    },
    {
      "value": "570"
    },
    {
      "value": "270"
    }
  ]
  },
  {
  
  },
  {
  
  }
  ]
  
  
}
export interface PeriodicElement {
  name: string;
  email:string;
  cust_id: number;
  contact: number;
  sites: number;
  energyConsume:number;
  savedEnergy:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  
];
