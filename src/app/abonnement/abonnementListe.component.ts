import { Component, OnInit } from '@angular/core';
import { AbonnerModel } from '../models/abonner';
import { AbonnerService } from '../services/abonner.service copy';
import Swal from 'sweetalert2';
import { FraisspeciauxService } from '../services/fraisspeciaux.service';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FraisspeciauxModel } from '../models/fraisspeciaux';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProduitAbonnementService } from '../services/produitabonnement.service';
import { AbonnementService } from '../services/abonnement.service';
import { AbonnementModel } from '../models/abonnement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abonner',
  templateUrl: './AbonnementListe.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementListeComponent implements OnInit {


  constructor(private abservice:AbonnementService,private dialog: MatDialog, private route: ActivatedRoute) { }

  type=new AbonnementModel();
  typeList:any;
  id:any;
  p: number = 1;
  hidden:boolean=false;
  redirect(id){
   
  }

  ngOnInit() {
    this.getTypeData();
    this.id=this.route.snapshot.paramMap.get('id');
  }

  getTypeData(){
    this.abservice.getcommande(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.typeList=res;
        console.log(this.typeList);
      }
    );
  }

  insertData(){
    let myDate = new Date();
    
    console.log(this.type);

    this.abservice.insertData(this.type).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bien Enregistrée',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTypeData();
        this.type= new AbonnementModel();
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
        this.abservice.deleteData(id).subscribe(
          res=>{
            console.log("cool"),
            this.getTypeData();
          }
        )
      }

    });
  }

  getType(id){

    this.abservice.getOneType(id).subscribe(
      (res:AbonnementModel)=>{
        console.log(res);
        this.type=res;
        this.id=id;
        this.hidden=true;
      }
    )
  }

  updateType(){
    console.log(this.type);
    console.log(this.id);
    this.abservice.updateType(this.id,this.type).subscribe(
      ()=>{

        this.getTypeData();
        this.type= new AbonnementModel();
        this.hidden=false;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.type= new AbonnementModel();
  }
  getfacture(id,id1){
    this.abservice.getfacture(id,id1).subscribe(
      ()=>{
        console.log("cool");
      }
    )
  }
}
























