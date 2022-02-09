import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TypeService} from './services/types.service';
import {VagueService} from './services/vague.service';
import {AuthService} from './services/auth.service';
import {UserModel} from './models/user.model';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-boulangerie';
  hidden=false;
  user=new UserModel();
  userList:any;


  constructor(private userservice : UserService,private authservice : AuthService) { }

  
  ngOnInit(){
   this.getUsers();

  }

  getUsers(){
    this.userservice.getData().subscribe(
      res=>{
        this.userList=res;
        console.log(this.userList=res);
      }
    );
  }

  signIn(){
    for(let user of this.userList){
      if(user.username==this.user.username && user.password==this.user.password){
           this.authservice.isAuth=true;
           this.hidden=false;
      }
    }
  }

  signOut(){
    this.authservice.isAuth=false;
    location.reload();
  }








}






