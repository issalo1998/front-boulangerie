import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {VagueService} from "../services/vague.service";
import {SearchModel} from "../models/search.model";
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";


@Component({
  selector: 'app-liste-vagues',
  templateUrl: './liste-vagues.component.html',
  styleUrls: ['./vagues.component.css']
})
export class ListeVaguesComponent implements OnInit {

  constructor(private router : Router,private vagueservice:VagueService,private dialog: MatDialog) { }

  p: number = 1;
  vagues:any;
  vagues1:any;
  search=new SearchModel();

  ngOnInit() {
    this.getVagues();
  }

  getVagues(){
    this.vagueservice.getData(4).subscribe(
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

  redirect(id){
    this.router.navigate(["/details/"+id]);
  }


  createvague(){
    this.router.navigate(["/vagues/"]);
  }

  redirect2(id){
    this.router.navigate(["/vagues/"+id]);
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
