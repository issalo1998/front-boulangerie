import { Component, OnInit } from '@angular/core';
import {TypeService} from '../services/types.service';
import {TypeModel} from '../models/type.model';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import Swal from "sweetalert2";

declare var bootbox:any;

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  constructor(private typeservice:TypeService,private dialog: MatDialog) { }

  p: number = 1;
  type=new TypeModel();
  typeList:any;
  id:any;
  hidden:boolean=false;

  ngOnInit() {
    this.getTypeData();
  }

  getTypeData(){
    this.typeservice.getData().subscribe(
      res => {
        this.typeList=res;
        console.log(this.typeList);
      }
    );
  }

  insertData(){
    this.typeservice.insertData(this.type).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bien Enregistrée',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTypeData();
        this.type= new TypeModel();
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
        this.typeservice.deleteData(id).subscribe(
          res=>{
            this.getTypeData();
          }
        )
      }

    });
  }

  getType(id){
    this.typeservice.getOneType(id).subscribe(
      res=>{
        this.type=res[0];
        this.id=id;
        this.hidden=true;
      }
    )
  }

  updateType(){
    this.typeservice.updateType(this.id,this.type).subscribe(
      res=>{
        this.getTypeData();
        this.type= new TypeModel();
        this.hidden=false;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.type= new TypeModel();
  }
}
