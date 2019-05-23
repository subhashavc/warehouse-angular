import { DataService } from './../services/data.service';
import { Popup } from 'ng2-opd-popup';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private popup:Popup, private data: DataService) { 
    this.popup.show();
  }

  ngOnInit() {
  
  }
  onClickPopup(){
    this.data.changeMessage("superAdmin");
  }

}
