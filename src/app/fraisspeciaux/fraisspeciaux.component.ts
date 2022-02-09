import { Component, OnInit } from '@angular/core';
import { TypeService } from '../services/types.service';
import { TypeModel } from '../models/type.model';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FraisspeciauxService } from '../services/fraisspeciaux.service';
import { FraisspeciauxModel } from '../models/fraisspeciaux';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-fraisspeciaux',
  templateUrl: './fraisspeciaux.component.html',
  styleUrls: ['./fraisspeciaux.component.css'],
  providers: [DatePipe]
})
export class FraisspeciauxComponent implements OnInit {
  constructor(private fraisspeciauxservice:FraisspeciauxService,private dialog: MatDialog,private datePipe: DatePipe) { }

  type=new FraisspeciauxModel();
  typeList:any;
  id:any;
  hidden:boolean=false;
  redirect(id){
   
  }

  ngOnInit() {
    this.getTypeData();
  }

  getTypeData(){
    this.fraisspeciauxservice.getData().subscribe(
      res => {
        this.typeList=res;
        console.log(this.typeList);
      }
    );
  }

  insertData(){
    if(this.type.date==null){
      let myDate = new Date();
      this.type.date= this.datePipe.transform(myDate, 'yyyy-MM-dd');;
    }

    this.fraisspeciauxservice.insertData(this.type).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bien Enregistrée',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTypeData();
        this.type= new FraisspeciauxModel();
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
        this.fraisspeciauxservice.deleteData(id).subscribe(
          res=>{
            console.log("cool"),
            this.getTypeData();
          }
        )
      }

    });
  }

  getType(id){

    this.fraisspeciauxservice.getOneType(id).subscribe(
      (res:FraisspeciauxModel)=>{
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
    this.fraisspeciauxservice.updateType(this.id,this.type).subscribe(
      ()=>{

        this.getTypeData();
        this.type= new FraisspeciauxModel();
        this.hidden=false;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.type= new FraisspeciauxModel();
  }
}
