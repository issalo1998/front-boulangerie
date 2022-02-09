import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { DepotService } from '../services/depot.service';
import { DepotModel } from '../models/depot';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {

  constructor(private depotservice:DepotService,private dialog: MatDialog) { }

  p: number = 1;
  depot=new DepotModel();
  depotList:any;
  id:any;
  hidden:boolean=false;


  ngOnInit() {
    this.getData();
  }

  getData(){
    this.depotservice.getData().subscribe(
        res => {
          this.depotList=res;
        }
    );
  }

  insertData(){
    if(this.depot.date==null){
      this.depot.date=formatDate(new Date(),'yyyy-MM-dd','en-FR');
    }
    console.log(this.depot);
    this.depotservice.insertData(this.depot).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bien Enregistrée',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData();
        this.depot= new DepotModel();
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
        this.depotservice.deleteData(id).subscribe(
          res=>{
            this.getData();
          }
        )
      }

    });
  }

  getOne(id){
    this.depotservice.getOneType(id).subscribe(
     (res:DepotModel)=>{
       console.log(res);
        this.depot=res;
        this.id=id;
        this.hidden=true;
      }
    )
  }

  update(){
    this.depotservice.updateType(this.id,this.depot).subscribe(
      res=>{
        this.getData();
        this.depot= new DepotModel();
        this.hidden=false;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.depot= new DepotModel();
  }

}
