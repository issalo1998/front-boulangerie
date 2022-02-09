import { Component, OnInit } from '@angular/core';
import {TypeService} from '../services/types.service';
import {VagueModel} from '../models/vague.model';
import {VagueService} from '../services/vague.service';
import {ProdSelectedModel} from '../models/prodselected.model';
import {IntermediaireModel} from '../models/intermediaire.model';
import {Router} from '@angular/router';
import {SearchModel} from '../models/search.model';
import {formatDate} from '@angular/common';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import Swal from 'sweetalert2';

declare var bootbox:any;

@Component({
  selector: 'app-vagues2',
  templateUrl: './vagues2.component.html',
  styleUrls: ['./vagues2.component.css']
})
export class Vagues2Component implements OnInit {

  search=new SearchModel();
  types : any;
  prodList:any;
  vagues:any;
  disable=true;
  vagues1:any;
  vague = new VagueModel();
  prodselected=new ProdSelectedModel();
  intermediaire =new IntermediaireModel();
  somme=0;
  resultat:boolean;



  constructor(private router : Router, private typeservice : TypeService,private vagueservice :VagueService,private dialog: MatDialog) { }


  ngOnInit() {
    setTimeout(() => {
      this.getTypes();
      this.returnProduits();
      this.getVagues();
    }, 600);
  }

  prodSelect(){
    this.getProdById();
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

  redirect(id){
    this.router.navigate(["/details2/"+id]);
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
              this.returnProduits();
            }
        )
      }

    });
  }


  getTypes(){
    this.typeservice.getData().subscribe(
        res=>{
          this.types= res;
        }
    );
  }

  returnProduits(){
    this.vagueservice.getProdByType(3).subscribe(
        res=>{
          this.prodList=res;
          console.log(this.prodList);
          for(let prod of this.prodList){
            prod.statut=false;
            prod.nombre=0;
            prod.plus=0;
            prod.vente=0;
            prod.cumul=0;
            prod.total=0;
            prod.reste=0;
            this.vagueservice.getLastReste(prod.id).subscribe(
                res=>{
                    if(res[0]==undefined){
                        prod.reste_prec=0;
                    }else{
                        prod.reste_prec=res[0].reste;
                    }
                }
            );
          }
        }
    );
  }

  getProdById(){
    for(let prod of this.prodList){
      if(prod.id==this.prodselected.id) {
        prod.statut=false
      }
    }
  }

  hidden(){
    this.vagueservice.getProdByType(3).subscribe(
        res=> {
          this.prodList = res;
        }
    )
  }

  selectHoraire(){
    this.vagueservice.getSommePat(this.vague.horaire,formatDate(new Date(),'yyyy-MM-dd','en-FR')).subscribe(
        res=> {
          if (res[0] != undefined) {
            this.disable = true;
            Swal.fire("Une vague de Patisserie a deja ete cree pour le "+this.vague.horaire);
            this.vague.horaire=null;
          }else{
            this.disable = false;

          }
        }
    );
  }

  cancel(id){
    for(let prod of this.prodList){
      if(prod.id==id) {
        prod.statut=true;
      }
    }
  }




  addVague(){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bien Enregistrée',
        showConfirmButton: false,
        timer: 1500
    });
  this.disable=true;
    this.vague.type_id = 3;
    this.vague.created_at = formatDate(new Date(),'yyyy-MM-dd','en-FR');
    this.vague.somme = 0;
    console.log(this.vague);
    this.vagueservice.insertData(this.vague).subscribe(
        res => {
            for(let prod of this.prodList){
                if(prod.nombre==undefined){
                    prod.nombre=0;
                }
                if(prod.reste==undefined){
                    prod.reste=0;
                }
                if(prod.reste_prec==undefined){
                    prod.reste_prec=0;
                }
            }
            for (let prod of this.prodList) {
                if (prod.statut == false) {
                    prod.total = prod.nombre * prod.contenu + prod.plus + prod.reste_prec;
                    prod.vente = prod.total - prod.reste;
                    prod.cumul = prod.prix * prod.vente;
                }
            }


          this.vagueservice.getLastVague().subscribe(
              res => {
                for (let prod of this.prodList) {
                  if (prod.statut == false) {
                    this.intermediaire.vague_id = res[0].id;
                    this.intermediaire.nombre = prod.nombre;
                    this.intermediaire.vente = prod.vente;
                    this.intermediaire.plus = prod.plus;
                    this.intermediaire.reste = prod.reste;
                    this.intermediaire.reste_prec = prod.reste_prec;
                    this.intermediaire.cumul = prod.cumul;
                    this.intermediaire.total = prod.total;
                    this.intermediaire.prod_id = prod.id;
                      this.intermediaire.prod_prix= prod.prix;
                    this.somme = this.somme + prod.cumul;
                    this.vagueservice.addIntermediaire(this.intermediaire).subscribe(
                        res => {
                          this.intermediaire = new IntermediaireModel();
                        }
                    );
                  }
                }
              }
          );

            this.vague.somme = this.vague.somme + this.somme;
            this.vagueservice.updateVague(res[0].id, this.vague).subscribe(
                res => {
                    this.router.navigate(["/listevagues2/"]);

                }
            );
        }
    );
  }









}
