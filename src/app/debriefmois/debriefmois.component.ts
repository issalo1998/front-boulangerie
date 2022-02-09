import { Component, OnInit } from '@angular/core';
import { VagueService } from '../services/vague.service';
import { DepotService } from '../services/depot.service';
import { FraisspeciauxService } from '../services/fraisspeciaux.service';
import { AbonnementService } from '../services/abonnement.service';

@Component({
  selector: 'app-debriefmois',
  templateUrl: './debriefmois.component.html',
  styleUrls: ['./debriefmois.component.css']
})
export class DebriefmoisComponent implements OnInit {
  mois:any[];
  caisses:any[];
  rightcaisse:any[];
  depots:any[];
  abonnements:any[];
  frais:any[];
  alltab:any[];
  selected: any;
     selected2=[];
  moiss = [
   {id:1,libelle:'Janvier'},
   {id:2,libelle:'Février'},
   {id:3,libelle:'Mars'},
   {id:4,libelle:'Avril'},
   {id:5,libelle:'Mai'},
   {id:6,libelle: 'Juin'},
   {id:7,libelle: 'Juillet'},
   {id:8,libelle: 'Août'},
   {id:9,libelle:'Septembre'},
   {id:10,libelle:'Octobre'},
   {id:11,libelle: 'Novembre'},
   {id:12,libelle: 'Décembre'}
];
  totalc=0;
  totaldpt=0;
  totalfr=0;
  totalab=0;
  constructor(
    private fraisservice :FraisspeciauxService,
    private vagueservice :VagueService,
    private depotservice :DepotService,
    private abonnementservice :AbonnementService,
    
    ) { }

  ngOnInit(): void {
   
  
   
   
 
        ///////
        var pageHeader = $('.content-header').find('b');
        var adminForm = $('.admin-form');
        var buttons = adminForm.find('.button');
        var Panel = adminForm.find('.panel');
        setTimeout(function () {
          adminForm.addClass('theme-primary');
          Panel.addClass('panel-primary');
          pageHeader.addClass('text-primary');
    
    
          buttons.removeClass().addClass('button btn-primary');
        }, 800);
        //////
  }
  trieCaisse(){
    this.rightcaisse=[];
    for(let sp of this.mois){
     let x=this.caisses.filter((a)=>a.dt==sp.dt);
     let une:any={};
     une.tab=[];
  
     if(x.filter((a)=>a.hr=="matin")[0]){
        une.date=x.filter((a)=>a.hr=="matin")[0].dt;
        une.tab.push(
          {
            verser:x.filter((a)=>a.hr=="matin")[0].vs,
            horaire:x.filter((a)=>a.hr=="matin")[0].hr
          }
        )
     }
     if(x.filter((a)=>a.hr=="soir")[0]){
      une.date=x.filter((a)=>a.hr=="soir")[0].dt;
      une.tab.push(
        {
          verser:x.filter((a)=>a.hr=="soir")[0].vs,
          horaire:x.filter((a)=>a.hr=="soir")[0].hr
        }
      )
    }
    this.rightcaisse.push(une);
   
  
    
  }
  console.log(this.rightcaisse);
  this.trieencore();
  }
  trieencore(){
    this.alltab=[];

    for(let m of this.mois){
      let x:any={};
      x.date=m.dt;
      x.caisse=this.rightcaisse.filter((a)=>a.date==m.dt)[0]?this.rightcaisse.filter((a)=>a.date==m.dt)[0]:[];
     
      x.depot=this.depots.filter((a)=>a.date==m.dt)?this.depots.filter((a)=>a.date==m.dt):[];
      x.frais=this.frais.filter((a)=>a.date==m.dt)?this.frais.filter((a)=>a.date==m.dt):[];
      x.abonnement=this.abonnements.filter((a)=>a.dt==m.dt)?this.abonnements.filter((a)=>a.dt==m.dt):[];
      this.alltab.push(x);


    
  }
  console.log(this.alltab);
  }
  getValues1() {;
    this.alltab=[];
    this.totalab=0;
    this.totalc=0
    this.totaldpt=0;
    this.totalfr=0

   console.log(this.selected);
   let id=this.selected.id
   this.fraisservice.getfraismois(id).subscribe(
    (data:any)=>{
      for(let a of data){
        this.totalfr=this.totalfr+a.montant;
      }
      this.frais=data;
      this.depotservice.getdepotmois(id).subscribe(
        (data:any)=>{
          for(let a of data){
            this.totaldpt=this.totaldpt+a.montant;
          }
          this.depots=data;
          this.vagueservice.getdatemois(id).subscribe(
            (data:any)=>{
                this.mois=data;
                this.vagueservice.getcaissedumois(id).subscribe(
                  (data:any)=>{
                      this.caisses=data;
                      for(let a of data){
                        this.totalc=this.totalc+a.vs;
                      }
                      this.abonnementservice.getabonnementmois(id).subscribe(
                        (data:any)=>{
                          this.abonnements=data;
                         
                          for(let a of data){
                            this.totalab=this.totalab+parseInt(a.somme);
                          }
                          this.trieCaisse();
                        }
                      )
                    
                  }
                );
            }
          );
        }
      )
    }
  )
  }

}
