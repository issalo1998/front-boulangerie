import { Component, OnInit } from '@angular/core';
import {CaisseModel} from "../models/caisse.model";
import {formatDate} from "@angular/common";
import {VagueService} from "../services/vague.service";
import {SearchModel} from "../models/search.model";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  caisse = new CaisseModel();
  disable=false;
  datecaisse:any; 
  disableok=true;
  disablesave=true;
  hidden=false;
  userList: any;
  horaire:any;


  constructor(private userservice : UserService,private router:Router,private dialog: MatDialog,private vagueservice:VagueService) { }

  ngOnInit() {
    this.initCaisse();
    this.getUserData();
  }



  getUserData(){
    this.userservice.getData().subscribe(
        res => {
          this.userList=res;
        }
    );
  }


  enregistrer(){
      console.log(this.caisse);
      if(this.caisse.verse==undefined){
          this.caisse.verse=0;
      }
     this.caisse.difference = this.caisse.verse-this.caisse.doit_verse;
    this.vagueservice.insertCaisse(this.caisse).subscribe(
        (res)=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bien Enregistrée',
                showConfirmButton: false,
                timer: 1500
            });
            this.caisse=new CaisseModel();
            this.initCaisse();
            this.disableok=true;
            this.disablesave=true;
            this.router.navigate(["/listecaisses/"]);
        }
    )
  }

  clickOk(){
      this.controleValeurs();
    const depenses = this.caisse.abonnement+this.caisse.ration+this.caisse.frais_patis+this.caisse.glace+this.caisse.levure
        +this.caisse.journee+this.caisse.omo_javel+this.caisse.livraison+this.caisse.commision+this.caisse.retour+this.caisse.divers+this.caisse.offert+this.caisse.depense;

    this.caisse.sortant=depenses;
    this.caisse.doit_verse=this.caisse.entrant-this.caisse.sortant;

    this.disablesave=false;
  }


  selectHoraire(){
      this.horaire=this.caisse.horaire;
    this.datecaisse=formatDate(new Date(),'yyyy-MM-dd','en-FR');

    this.vagueservice.getCaisseByHoraire(this.caisse.horaire,this.caisse.horaire,this.datecaisse).subscribe(
        res=>{
            if(res==1){
              Swal.fire("Une caisse du "+this.horaire+" a deja ete cree");
                this.disable=true;

            }else{
                if(this.caisse.caissier==undefined){
                        Swal.fire(" Veuillez choisir le caissier ");
                        this.disable=true;
                        this.caisse.horaire=undefined;


                }else{
                   
                        this.vagueservice.getSommeBoul(this.caisse.horaire,this.datecaisse).subscribe(
                            res=>{
                                if(res[0]==undefined  ){

                                  setTimeout(() => {
                                    Swal.fire("La vague de boulangerie n'a pas ete cree pour le "+this.horaire);
                                  },2000);
                                    this.disable=true;
                                    this.caisse.horaire=undefined;

                                }else{
                                    this.caisse.boulangerie=res[0].somme;
                                    this.disableok=false;
                                    this.disable=false;
                                }
                            }
                        );
                        this.vagueservice.getSommePat(this.caisse.horaire,this.datecaisse).subscribe(
                            res=>{
                                if(res[0]==undefined){
                                    Swal.fire("La vague de patisserie n'a pas ete cree pour le "+this.horaire);
                                    this.disable=true;
                                    this.disableok=true;
                                    this.caisse.horaire=undefined;

                                } else{
                                    this.caisse.patisserie=res[0].somme;
                                    this.caisse.entrant = this.caisse.boulangerie+this.caisse.patisserie;
                                    this.disableok=false;
                                    this.disable=false;
                                }
                               


                            }
                        );

                }
               
            }

        }
    );

  }

  controleValeurs(){

      if(this.caisse.abonnement==undefined){
          this.caisse.abonnement=0;
      }
      if(this.caisse.offert==undefined){
          this.caisse.offert=0;
      }
      if(this.caisse.divers==undefined){
          this.caisse.divers=0;
      }
      if(this.caisse.retour==undefined){
          this.caisse.retour=0;
      }
      if(this.caisse.commision==undefined){
          this.caisse.commision=0;
      }
      if(this.caisse.livraison==undefined){
          this.caisse.livraison=0;
      }
      if(this.caisse.omo_javel==undefined){
          this.caisse.omo_javel=0;
      }
      if(this.caisse.journee==undefined){
          this.caisse.journee=0;
      }
      if(this.caisse.levure==undefined){
          this.caisse.levure=0;
      }
      if(this.caisse.glace==undefined){
          this.caisse.glace=0;
      }
      if(this.caisse.frais_patis==undefined){
          this.caisse.frais_patis=0;
      }
      if(this.caisse.ration==undefined){
          this.caisse.ration=0;
      }
      if(this.caisse.depense==undefined){
        this.caisse.depense=0;
    }



  }

  initCaisse(){
    this.caisse.abonnement=0;
    this.caisse.ration=0;
    this.caisse.frais_patis=0;
    this.caisse.glace=0;
    this.caisse.levure=0;
    this.caisse.journee=0;
    this.caisse.omo_javel=0;
    this.caisse.livraison=0;
    this.caisse.commision=0;
    this.caisse.retour=0;
    this.caisse.divers=0;
    this.caisse.boulangerie=0;
    this.caisse.patisserie=0;
    this.caisse.entrant=0;
    this.caisse.sortant=0;
    this.caisse.doit_verse=0;
    this.caisse.difference=0;
    this.caisse.verse=0;
    this.caisse.offert=0;
    this.caisse.depense=0;
    this.caisse.created_at=formatDate(new Date(),'yyyy-MM-dd','en-FR');
  }


}
