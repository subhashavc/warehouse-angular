import { GlobalService } from './../services/global.service';
import { DataService } from './../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Common Dashboard';
  adminDashboard: string;
  infoToken;
  userActName=localStorage.getItem('account');

  myObj = JSON.parse(localStorage.getItem("account"));
  //firstName = myObj["username"];

  isHandsets: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(private data: DataService, private breakpointObserver: BreakpointObserver,
    private router: Router,private tokenService: TokenService,private global:GlobalService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(
      response => this.adminDashboard = response
      );

      if(localStorage.getItem('token') && localStorage.getItem('account')){
        this.global.me = JSON.parse(localStorage.getItem('account'));
        //this.getMovies();
        this.getToken();

       //this.idel.start();

    }else{
      this.router.navigate(['/login']);
    }
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
          //this.idel.stop();
          },
          error => {
              console.log("Error", error);
              //this.idel.stop();
          }
      );
    }
    else{
      this.router.navigate(['/login']); 
    }
    console.log("MyToken", localStorage.getItem('account'));
  
    
  }
  

}
