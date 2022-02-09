import { Component, OnInit } from '@angular/core';
import {CaisseModel} from "../models/caisse.model";
import {VagueService} from "../services/vague.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import Swal from 'sweetalert2';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-edit-caisse',
  templateUrl: './edit-caisse.component.html',
  styleUrls: ['./edit-caisse.component.css']
})
export class EditCaisseComponent implements OnInit {

  id=this.route.snapshot.params['id'];
  caisse = new CaisseModel();
  datecaisse:any;
  disableok=false;
  disablesave=true;
  userList: any;
  horaire:any;


  constructor(private userservice : UserService,private router : Router,private vagueService:VagueService,private vagueservice:VagueService,private  route:ActivatedRoute) { }


  ngOnInit() {
    this.getCaisse(this.id);
    this.getUserData();
  }


  getUserData(){
    this.userservice.getData().subscribe(
        res => {
          this.userList=res;
        }
    );
  }

  getCaisse(id){
    this.vagueService.getOneCaisse(id).subscribe(
        res=>{
          this.caisse=res[0];
          this.caisse.difference=this.caisse.verse-this.caisse.doit_verse;
        }
    )
  }

    redirect(){
        this.router.navigate(["/listecaisses"]);
    }


  enregistrer(){
    console.log(this.caisse);
    this.caisse.difference = this.caisse.verse-this.caisse.doit_verse;
    this.vagueService.updateCaisse(this.id,this.caisse).subscribe(
        res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bien Editée',
                showConfirmButton: false,
                timer: 1500
            });
            this.router.navigate(["/listecaisses"]);
        }
    )
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

        this.vagueservice.getCaisseByHoraire(this.caisse.id,this.caisse.horaire,this.datecaisse).subscribe(
            res=>{
                if(res==1){
                    Swal.fire("Une caisse du "+this.caisse.horaire+" a deja ete cree");
                    this.disableok=true;
                    this.caisse.horaire=null;
                }else{
                    this.vagueService.getSommeBoul(this.caisse.horaire,this.caisse.created_at).subscribe(
                        res=>{
                            if(res[0]==undefined){
                                this.disableok = true;
                                this.disablesave=true;
                                setTimeout(() => {
                                    Swal.fire("La vague de boulangerie n'a pas ete cree pour le "+this.horaire);
                                    this.caisse.horaire=null;
                                },2000);

                            }else{
                                this.caisse.boulangerie=res[0].somme;
                            }
                        }
                    );

                    this.vagueService.getSommePat(this.caisse.horaire,this.caisse.created_at).subscribe(
                        res=>{
                            if(res[0]==undefined){
                                this.disableok = true;
                                this.disablesave=true;
                                this.caisse.horaire=null;
                                Swal.fire("La vague de patisserie n'a pas ete cree pour le "+this.horaire);
                            }else{
                                this.caisse.patisserie=res[0].somme;
                                this.caisse.entrant = this.caisse.boulangerie+this.caisse.patisserie;
                                this.disableok=false;
                            }
                        }
                    );
                }
            }
        );

    }






}
