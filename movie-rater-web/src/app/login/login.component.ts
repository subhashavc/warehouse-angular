import { DashboardDataService } from './../services/dashboard-data.service';
import { DataService } from './../services/data.service';
import { Popup } from 'ng2-opd-popup';
import { GlobalService } from './../services/global.service';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService],
    
})



export class LoginComponent implements OnInit {
  userLogin: FormGroup;
  loading: boolean;
  adminDashboard: string;
  dashbaordData;
  
  
 

  constructor(private fb: FormBuilder,private router: Router, private userService:UserService, 
    private global: GlobalService,private popup:Popup, private data: DataService, private dashData:DashboardDataService) { 
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }




  ngOnInit() {
    this.loading = false;
    if(localStorage.getItem('token') && localStorage.getItem('account')){
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.router.navigate(['/home']);
    }
  }
  onLogin() {
    this.loading = true;
    this.userService.loginUser(this.userLogin.value).subscribe(
          response => {
            console.log("suusus",response)
              this.loading = false;
              localStorage.setItem('token', response['token']);
              localStorage.setItem('Saved Engergy', response['Saved Engergy']);
              this.global.me = response['user'];
              this.router.navigate(['/dashboard']);
              this.data.changeMessage("superAdmin");
              this.custTable();
          },
          error => {
            this.loading = false;
            console.log('error', error);    
          }

    );
  }
  custTable(){
    this.loading = true;
    this.userService.superAdminCustomertable().subscribe(
          response => {
              this.loading = false;
              console.log('Customer Table : ', response);
              this.dashbaordData = response;
                           
              sessionStorage.setItem("myValue",JSON.stringify(this.dashbaordData));
              
          },
          error => {
            this.loading = false;
            console.log('error', error);    
          }

    );
  }
  
  onClickPopup(){
    this.popup.options = {
          header: "Password Reset",
          color: "#E66F00", // red, blue....
          widthProsentage: 25, // The with of the popou measured by browser width
          animationDuration: 1, // in seconds, 0 = no animation
          showButtons: true, // You can hide this in case you want to use custom buttons
          confirmBtnContent: "Submit", // The text on your confirm button
          cancleBtnContent: "Cancel", // the text on your cancel button
          confirmBtnClass: "hidden btn btn-outline-primary", // your class for styling the confirm button
          cancleBtnClass: "btn btn-outline-danger", // you class for styling the cancel button
          animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
      };
        this.popup.show(this.popup.options);
    
  }
  

}
