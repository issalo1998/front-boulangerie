import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../services/types.service';
import {VagueService} from '../services/vague.service';
import {ProduitService} from '../services/produit.service';
import {IntermediaireModel} from '../models/intermediaire.model';
import {formatDate} from "@angular/common";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-single-vague',
  templateUrl: './single-vague.component.html',
  styleUrls: ['./single-vague.component.css']
})
export class SingleVagueComponent implements OnInit {

  constructor(private router : Router ,private produitservice: ProduitService,private  route:ActivatedRoute,private typeservice : TypeService,private vagueservice :VagueService) { }

  types : any;
  vague:any;
  prodList:any;
  prodSelected: any[] = [];
  disable=false;
  somme=0;
  intermediaires:any;
  intermediaire=new IntermediaireModel();
  id=this.route.snapshot.params['id'];

  ngOnInit() {
    this.returnProduits();
    this.getOneVague();
    this.returnIntermediaires();
  }



  redirect(){
    this.router.navigate(["/listevagues"]);
  }

  getOneVague(){
    this.vagueservice.getOneVague(this.id).subscribe(
      res=>{
        this.vague=res[0];

      }
    )
  }

  selectHoraire(){
    this.vagueservice.getNbre(this.vague.id,this.vague.horaire,formatDate(new Date(),'yyyy-MM-dd','en-FR'),4).subscribe(
        res=> {
          console.log(res);
          if (res==1) {
            this.disable = true;
              Swal.fire("Une vague de Patisserie a deja ete cree pour le "+this.vague.horaire);
            this.vague.horaire=null;
          }else{
            this.disable = false;
          }
        }
    );
  }


  returnProduits(){
    this.vagueservice.getProdByType(4).subscribe(
      res=>{
        this.prodList=res;
        for(let prod of this.prodList){
          prod.statut=true;
          prod.nombre=0;
          prod.plus=0;
          prod.vente=0;
          prod.reste=0;
          prod.total=0;
        }
      }
    );

  }

  returnIntermediaires(){
        this.vagueservice.getIntermediairesByVague(this.id).subscribe(
          res=>{
            this.intermediaires=res;
            console.log(this.intermediaires);
            for(let inter of this.intermediaires){
              for(let prod of this.prodList){
                if(prod.id==inter.prod_id){
                    prod.statut=false;
                    prod.nombre=inter.nombre;
                    prod.plus=inter.plus;
                    prod.vente=inter.vente;
                    prod.reste=inter.reste;
                    prod.total=inter.total;
                    prod.prix =  inter.prod_prix;
                    prod.inter_id = inter.id;
                    this.prodSelected.push(prod);
                }
              }
            }
            console.log(this.prodSelected);
          }
        )
  }

  editVague(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Bien Editée',
      showConfirmButton: false,
      timer: 2500
  });
  this.disable=true;
    this.vague.type_id=4;

      for(let prod of this.prodSelected){
          if(prod.nombre==undefined){
              prod.nombre=0;
          }
          if(prod.reste==undefined){
              prod.reste=0;
          }
          if(prod.plus==undefined){
              prod.plus=0;
          }
      }

    for(let prod of this.prodSelected){
        prod.total = prod.nombre * prod.contenu + prod.plus ;
        prod.vente=prod.total-prod.reste;
        prod.cumul = prod.prix * prod.vente;
        console.log(prod.cumul);
      }

      for(let prod of this.prodSelected) {
          if(prod.statut == true){
              this.vagueservice.deleteIntermediaire(prod.inter_id).subscribe(
                  res =>{
                      console.log("fuck");
                  }
              );
          }else{
              this.intermediaire.vague_id = this.id;
              this.intermediaire.nombre = prod.nombre;
              this.intermediaire.vente = prod.vente;
              this.intermediaire.plus = prod.plus;
              this.intermediaire.reste = prod.reste;
              this.intermediaire.cumul = prod.cumul;
              this.intermediaire.total = prod.total;
              this.intermediaire.prod_id = prod.id;
              this.intermediaire.reste_prec=0;
              this.intermediaire.id = prod.inter_id;
              this.intermediaire.prod_prix= prod.prix;
              this.somme = this.somme + prod.cumul;
              console.log(this.intermediaire);
              this.vagueservice.updateIntermediaire(this.intermediaire.id,this.intermediaire).subscribe(
                  res => {
                      this.intermediaire=new IntermediaireModel();

                  }
              );
          }
      }

    this.vague.somme=this.somme;
    this.vagueservice.updateVague(this.vague.id,this.vague).subscribe(
        res=>{
            this.router.navigate(["/listevagues"]);
        }
    );

  }

  cancel(id){
    for(let prod of this.prodSelected){
      if(prod.id==id) {
        prod.statut=true
      }
    }
  }

}
