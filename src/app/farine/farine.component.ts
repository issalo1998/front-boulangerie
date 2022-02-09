import { Component, OnInit } from '@angular/core';

import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { TypeService } from '../services/types.service';
import { MatDialog } from '@angular/material';
import { FarineService } from '../services/farines.service';
import { FarineModel } from '../models/farine';
import {Router} from "@angular/router";




@Component({
  selector: 'app-farine',
  templateUrl: './farine.component.html',
  styleUrls: ['./farine.component.css']
})
export class FarineComponent implements OnInit {

  constructor(private router : Router,private farineservice:FarineService,private dialog: MatDialog) { }
    p: number = 1;
  farine=new FarineModel();
  farineList:any;
  id:any;
  hidden:boolean=false;

 
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.farineservice.getData().subscribe(
        res => {
          this.farineList=res;
            console.log(this.farineList);
        }
    );
  }

  insertData(){
    this.farineservice.insertData(this.farine).subscribe(
        res=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bien Enregistrée',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData();
          this.farine= new FarineModel();
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
        this.farineservice.deleteData(id).subscribe(
            res=>{
              this.getData();
            }
        )
      }

    });
  }

  getOne(id){
    this.farineservice.getOne(id).subscribe(
        (res:FarineModel)=>{
          console.log(res);
          this.farine=res;
          this.id=id;
          this.hidden=true;
        }
    )
  }

  update(){
    console.log(this.farine);
    this.farineservice.updateFarine(this.id,this.farine).subscribe(
        res=>{
          this.getData();
          this.farine= new FarineModel();
          this.hidden=false;

        }
    );
  }

  cancel(){
    this.hidden=false;
    this.farine= new FarineModel();
  }

    redirect(id){
        this.router.navigate(["/entreesorties/"+id+"/"+0]);
    }

    redirectHisto(id){
        this.router.navigate(["/listehistorique/"+id]);
    }

}
