import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {CaisseModel} from "../models/caisse.model";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";
import {VagueService} from "../services/vague.service";
import {SearchModel} from "../models/search.model";

@Component({
  selector: 'app-liste-caisses',
  templateUrl: './liste-caisses.component.html',
  styleUrls: ['./caisse.component.css']
})
export class ListeCaissesComponent implements OnInit {

  constructor(private dialog: MatDialog,private router:Router,private vagueservice:VagueService) { }

  p: number = 1;
  caisse = new CaisseModel();
  caisses:any;
  caisses1:any;
  search=new SearchModel();

  ngOnInit(): void {
    this.getCaisses();
  }


  createcaisse(){
    this.router.navigate(["/caisse"]);
  }

  redirect(id){
    this.router.navigate(["/caisse/"+id]);
  }

  redirectDetails(id){
    this.router.navigate(["/detailcaisse/"+id]);
  }

  deleteData(id){
    const message = `Voulez vous vraiment supprimer ?`;

    const dialogData = new ConfirmDialogModel("Suppression", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.vagueservice.deleteCaisse(id).subscribe(
            res=>{
              this.getCaisses();
            }
        )
      }

    });
  }



  getCaisses(){
    this.vagueservice.getCaisses().subscribe(
        res=>{
          this.caisses=res;
          for(let caisse of this.caisses){
            caisse.created_at=formatDate(caisse.created_at,'dd/MM/yyyy','en-FR');
          }
          this.caisses1=this.caisses;
          console.log(this.caisses);
        }
    )
  }

  filterByDate(){
    this.search.date=formatDate(this.search.date,'dd/MM/yyyy','en-FR');
    if(this.search.date==""){
      this.caisses=this.caisses1;
    }else{
      this.caisses=this.caisses1.filter((a)=>a.created_at.indexOf(this.search.date)!=-1);
    }
  }

}
