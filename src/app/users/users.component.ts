import { Component, OnInit } from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/user.service';
import {ProfilService} from '../services/profil.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import Swal from "sweetalert2";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    p: number = 1;
  userList: any;
  id:any;
  selectedprofil:any = [];
  profils:any;
  hidden:boolean = false;
  user = new UserModel();


  constructor(private userservice:UserService,private profilservice:ProfilService,private dialog: MatDialog) { }



  ngOnInit() {
    this.getUserData();
    this.getProfils();
  }

  getUserData(){
    this.userservice.getData().subscribe(
      res => {
        this.userList=res;
        for(let user of this.userList){
          this.profilservice.getOneProfil(user.profil_id).subscribe(
            res=>{
                user.profil=res[0].libelle;
            }
          )
        }
      }
    );
  }

  insertData(){
    console.log(this.user);
    this.userservice.insertData(this.user).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bien Enregistrée',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUserData();
        this.user= new UserModel();
      }
    )
  }

  deleteData(id): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.userservice.deleteData(id).subscribe(
          res=>{
            this.getUserData();
          }
        )
      }

    });
  }

  getUser(id){
    this.userservice.getOneUser(id).subscribe(
      res=>{
        this.user=res[0];
        console.log(this.user.etat);
        this.id=id;
        this.hidden=true;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.user= new UserModel();
  }

  updateUsers(){
    this.userservice.updateUser(this.id,this.user).subscribe(
      res=>{
        this.getUserData();
        this.user= new UserModel();
        this.hidden=false;

      }
    );
  }

  getProfils(){
    this.userservice.getProfils().subscribe(
      res=>{
        this.profils= res;
      }
    )
  }
}
