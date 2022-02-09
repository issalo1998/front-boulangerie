import { Component, OnInit } from '@angular/core';
import {HistoriqueService} from "../services/historique.service";
import {entresortieModel} from "../models/entresortie.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FarineModel} from "../models/farine";
import {FarineService} from "../services/farines.service";
import {HistoriqueModel} from "../models/historique";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-entreesortie',
  templateUrl: './entreesortie.component.html',
  styleUrls: ['./entreesortie.component.css']
})
export class EntreesortieComponent implements OnInit {

  constructor(private router : Router,private  route:ActivatedRoute,private historiqueservice : HistoriqueService,private farineservice:FarineService) { }
  id:any;
  idhisto:any;
  entreesortie = new entresortieModel();
  farine = new FarineModel();
  historique = new HistoriqueModel();
  disable = false;
  disablevaleur = true;

  ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
      this.idhisto=this.route.snapshot.params['idhisto'];
      this.getFarine();
      if(this.idhisto!=0){
          this.disablevaleur=false;
          this.getHistorique();
      }
  }

  getFarine(){
    this.farineservice.getOne(this.id).subscribe(
        (res:FarineModel)=>{
          console.log(res);
          this.farine=res;
        }
    )
  }

  getHistorique(){
      this.historiqueservice.getOne(this.idhisto).subscribe(
          (res:HistoriqueModel)=>{
              this.historique = res;
              this.recharge();
              console.log(this.historique);
              console.log(this.farine);
          }
      )
  }

  changeTotal(a){
      if(this.entreesortie.action=="entree"){
        this.entreesortie.total = this.farine.quantite+a;
        this.disable = false;
        this.historique.action="entree";
        this.historique.quantite=a;
      }else{
        if(a>this.farine.quantite){
          alert("la valeur doit etre inferieur au stock");
          this.disable = true;
        }else{
          this.entreesortie.total = this.farine.quantite-a;
            this.historique.action="sortie";
            this.historique.quantite=a;
          this.disable = false;
        }
      }
  }

  save(){
    this.farine.quantite=this.entreesortie.total;
    this.historique.date =formatDate(new Date(),'yyyy-MM-dd','en-FR');
    this.historique.farine_id=this.id;
    console.log(this.farine);
    this.farineservice.updateFarine(this.id,this.farine).subscribe(
        res=>{
            console.log(this.historique);
            this.historiqueservice.insertData(this.historique).subscribe(
                res=>{
                  this.redirect();
                }
            )
        }
    )
  }

  sauvegarder(){
      if(this.idhisto!=0){
          this.update();
          console.log("update");
      }else{
          this.save();
          console.log("save");
      }
  }

  update(){
      this.farine.quantite=this.entreesortie.total;
      this.farineservice.updateFarine(this.id,this.farine).subscribe(
          res=>{
              this.historiqueservice.update(this.idhisto,this.historique).subscribe(
                  res=>{
                      this.redirect();
                  }
              )
          }
      )
  }

  onselect(){
      if(this.entreesortie.action!=null){
          this.disablevaleur=false;
          if(this.entreesortie.action=="entree"){
              this.entreesortie.total= this.farine.quantite+this.entreesortie.valeur;
          }else{
              this.entreesortie.total= this.farine.quantite-this.entreesortie.valeur;
          }
      }
  }

    recharge(){
      this.entreesortie.action=this.historique.action;
      this.entreesortie.valeur=this.historique.quantite;
      this.entreesortie.total=this.farine.quantite;
      if(this.entreesortie.action=="entree"){
          this.farine.quantite = this.entreesortie.total-this.entreesortie.valeur;
      }else{
          this.farine.quantite = this.entreesortie.total+this.entreesortie.valeur;
      }
    }

    redirect(){
        this.router.navigate(["/farines"]);
    }


}













