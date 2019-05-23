import { UserService } from './../services/user.service';
import { MovieService } from './../services/movie.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Idle } from 'idlejs/dist';
import {Popup} from 'ng2-opd-popup';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[MovieService]
})
export class HomeComponent implements OnInit {
  
  idel = new Idle()
    .whenNotInteractive()
    .within(10, 1000)
    .do(() => this.logOut())

  
  account: User = new User();
  userSub: Subscription
  infosk;
  infoToken;
  adminDashboard: string;

  constructor(private global:GlobalService, private router: Router, private movieService: MovieService, 
    private userService: UserService, private tokenService: TokenService) { }

  ngOnInit() {
    

    this.userSub = this.global.user.subscribe(
      me => this.account = me
  
    );

    if(localStorage.getItem('token') && localStorage.getItem('account')){
        this.global.me = JSON.parse(localStorage.getItem('account'));
        this.getMovies();
        this.getToken();

       this.idel.start();

    }else{
      this.router.navigate(['/login']);
    }
  }
  getMovies(){
    this.movieService.getMovies().subscribe(
      response => {
        this.infosk = response;
        // this.moviesInfo = response['title'];
        console.log('sk',response);
      },
      error => {
        console.log('error',error);
      }
    );
    
  }
  getToken(){
    this.tokenService.getToken().subscribe(
      response => {
        this.infoToken = response;
        // this.moviesInfo = response['title'];
        console.log('My-token',response);
      },
      error => {
        console.log('error',error);
      }
    );
    
  }


  logOut(){
    
      if(confirm("Session is expiry..! Login again")){
        
          this.tokenService.removeToken(localStorage.getItem('token')).subscribe(
            response => {
              const movIndx = this.infoToken.map(function(e) {return e.key; }).indexOf(localStorage.getItem('token'));
              if(movIndx >=0){
                this.infoToken.splice(movIndx, 1);
              }
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            this.idel.stop();
            },
            error => {
                console.log("Error", error);
                this.idel.stop();
            }
        );
      }
      else{
        this.router.navigate(['/login']); 
      }
    
    //this.modalService.open(localStorage.getItem('account.username'));
  //   this.popup1.options = {
  //     header: "Confirmation",
  //     color: "#E66F00", // red, blue....
  //     widthProsentage: 25, // The with of the popou measured by browser width
  //     animationDuration: 1, // in seconds, 0 = no animation
  //     showButtons: true, // You can hide this in case you want to use custom buttons
  //     confirmBtnContent: "OK", // The text on your confirm button
  //     cancleBtnContent: "Cancel", // the text on your cancel button
  //     confirmBtnClass: "hidden btn btn-outline-primary", // your class for styling the confirm button
  //     cancleBtnClass: "btn btn-outline-danger", // you class for styling the cancel button
  //     animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
  // };
    //this.popup1.show(this.popup1.options);
    console.log("MyToken", localStorage.getItem('account'));
    
      
    }
    switchDash(){
      this.router.navigate(['/dashboard']);
      this.adminDashboard='customerAdmin';
    }

  }
