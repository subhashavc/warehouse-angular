import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  private data;

  setData(data){
    this.data = data;
    console.log("3rd service class : ", data);
  }

  getData(){
    let temp = this.data;
    //this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
  //private dashboardValue = new BehaviorSubject<any>("");
  //currentValue = this.dashboardValue.asObservable();
  

  constructor() {
    
   }

  // changeValue(newValue: string){
  //   this.dashboardValue.next(newValue);
    
  // }
}
