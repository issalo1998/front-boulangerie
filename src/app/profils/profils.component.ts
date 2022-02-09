import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../services/profil.service';
import {ProfilModel} from '../models/profil.model';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit {

    p: number = 1;
  profilList: any;
  id:any;
  hidden:boolean = false
  profil = new ProfilModel();
  constructor(private profilservice:ProfilService,private dialog: MatDialog) { }

  ngOnInit() {
    this.getProfilData();
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
        this.profilservice.deleteData(id).subscribe(
          res=>{
            this.getProfilData();
          }
        )
      }

    });
  }

  getProfilData(){
    this.profilservice.getData().subscribe(
      res => {
        this.profilList=res;
      }
    );
  }

  insertData(){
    this.profilservice.insertData(this.profil).subscribe(
      res=>{
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bien Enregistrée',
              showConfirmButton: false,
              timer: 1500
          });
        this.getProfilData();
        this.profil= new ProfilModel();
      }
    )

  }


  getProfil(id){
      this.profilservice.getOneProfil(id).subscribe(
        res=>{
          this.profil=res[0];
          this.id=id;
          this.hidden=true;
        }
      )
  }

  updateProfil(){
    this.profilservice.updateProfil(this.id,this.profil).subscribe(
      res=>{
        this.getProfilData();
        this.profil= new ProfilModel();
        this.hidden=false;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.profil= new ProfilModel();
  }


}
