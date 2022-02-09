import { Component, OnInit } from '@angular/core';
import {SearchModel} from "../models/search.model";
import {VagueModel} from "../models/vague.model";
import {Router} from "@angular/router";
import {VagueService} from "../services/vague.service";
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-vague2',
  templateUrl: './liste-vague2.component.html',
  styleUrls: ['./vagues2.component.css']
})
export class ListeVague2Component implements OnInit {

  constructor(private router : Router,private vagueservice :VagueService,private dialog: MatDialog) { }

  p: number = 1;
  search=new SearchModel();
  vagues:any;
  vagues1:any;
  vague = new VagueModel();

  ngOnInit(): void {
    this.getVagues()
  }

  redirect(id){
    this.router.navigate(["/details2/"+id]);
  }

  redirect2(id){
    this.router.navigate(["/vagues2/"+id]);
  }

  createvague(){
    this.router.navigate(["/vagues2/"]);
  }

  getVagues(){
    this.vagueservice.getData(3).subscribe(
        res=>{
          this.vagues= res;
          for(let vague of this.vagues){
            vague.created_at=formatDate(vague.created_at,'dd/MM/yyyy','en-FR');
          }
          this.vagues1= this.vagues;

        }
    );
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
        this.vagueservice.deleteData(id).subscribe(
            res=>{
              this.getVagues();
            }
        )
      }

    });
  }

  filterByDate(){
    this.search.date=formatDate(this.search.date,'dd/MM/yyyy','en-FR');
    if(this.search.date==""){
      this.vagues=this.vagues1;
    }else{
      this.vagues=this.vagues1.filter((a)=>a.created_at.indexOf(this.search.date)!=-1);
    }
  }

}
