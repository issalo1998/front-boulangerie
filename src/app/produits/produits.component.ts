import { Component, OnInit } from '@angular/core';
import {ProduitModel} from '../models/produit.model';
import {TypeService} from '../services/types.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {VagueService} from "../services/vague.service";
import {ProduitService} from "../services/produit.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  constructor(private produitservice:ProduitService,private vagueservice:VagueService,private typeservice : TypeService,private dialog: MatDialog) { }

    p: number = 1;

  types:any;
  hidden:boolean=false;
  produitListBoul:any;
  produitListPat:any;
  id:any;
  contenubool:boolean=true;
  produit:ProduitModel;

  ngOnInit() {
    this.produit=new ProduitModel();
    this.getProduitBoul();
    this.getProduitPat();
    this.getTypes();
  }

  getProduitBoul(){
    this.vagueservice.getProdByType(4).subscribe(
      res => {
        this.produitListBoul=res;
        console.log(res);
        }
    );
  }

  getProduitPat(){
    this.vagueservice.getProdByType(3).subscribe(
      res => {
        this.produitListPat=res;
      }
    );
  }

  select(){
    if(this.produit.type_id==3){
      this.produit.contenu=1;
      this.contenubool=true;
    }else{
      this.contenubool=false;
    }

  }


  insertData(){
    console.log(this.produit)
   
    this.produitservice.insertData(this.produit).subscribe(
      res=>{
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bien Enregistrée',
              showConfirmButton: false,
              timer: 1500
          })
        this.getProduitBoul();
        this.getProduitPat();

        this.produit= new ProduitModel();
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
        this.produitservice.deleteData(id).subscribe(
          res=>{
            this.getProduitBoul();
            this.getProduitPat();
          }
        )
      }

    });
  }

  getProduit(id){
    this.produitservice.getOneProduit(id).subscribe(
      res=>{
        this.produit=res[0];
        this.select();
        this.id=id;
        this.hidden=true;

      }
    );
  }

  cancel(){
    this.hidden=false;
    this.produit= new ProduitModel();
  }

  updateProduit(){
    this.produitservice.updateProduit(this.id,this.produit).subscribe(
      res=>{
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bien Editée',
              showConfirmButton: false,
              timer: 1500
          })
        this.getProduitBoul();
        this.getProduitPat();
        this.produit= new ProduitModel();
        this.hidden=false;

      }
    );
  }

  getTypes(){
    this.typeservice.getData().subscribe(
      res=>{
        this.types= res;
      }
    )
  }

}
