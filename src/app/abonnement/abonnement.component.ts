import { Component, OnInit } from '@angular/core';
import { CommandeModel } from '../models/commande';
import { CommandeService } from '../services/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonnementModel } from '../models/abonnement';
import { AbonnementService } from '../services/abonnement.service';
import { TypeService } from '../services/types.service';
import { ProduitService } from '../services/produit.service';
import { TypeModel } from '../models/type.model';
import { ProduitModel } from '../models/produit.model';
import { AbonnerService } from '../services/abonner.service copy';
import { AbonnerModel } from '../models/abonner';
import { DatePipe } from '@angular/common';
import { ProduitAbonnementService } from '../services/produitabonnement.service';
import { ProduitAbonnementModel } from '../models/produitabonnement';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css'],
  providers: [DatePipe]
})
export class AbonnementComponent implements OnInit {
  abonnement:AbonnementModel;
  abonner:AbonnerModel;
  moiss = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'
  ];
  items = [
];
  selected:any;
  selecte2:any



  types:any[];
  produits:any[];
  tabpu=[];
  tissu:AbonnementModel;


  constructor(private abonnementservice:AbonnementService,
    private abonnerservice:AbonnerService,
    private prodab:ProduitAbonnementService,
    private typeservice:TypeService,
    private produitservice:ProduitService,
    private datePipe: DatePipe,
    private router:Router,
    private route: ActivatedRoute
              ) {

  }


  
  getValues1() {

    for(let a of this.items){
      a.cocher=false;
    }
    for(let a of this.selected){
      a.cocher=true;
    }
    console.log(this.items);
  }
  public ngOnInit() {



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







    const comp = this;
    let myDate = new Date();
    this.abonnementservice.getpositionMois(this.datePipe.transform(myDate,'yyyy-MM-dd')).subscribe(
      (data)=>{
      console.log(data);
      this.abonnement.mois=this.moiss[data[0].date-1];
      //this.abonnement.mois="fffp";
        console.log(this.abonnement.mois);
      }
    );
    this.abonner=new AbonnerModel();
    this.abonnerservice.getOneType(this.route.snapshot.paramMap.get('id')).subscribe(
      (data:AbonnerModel)=>{
          this.abonner=data;
      }
    )
  
    this.produitservice.getProduit().subscribe(
      (data:any)=>{
        console.log(data);
          this.items=data;
      }
    );
   
    this.abonnement= new AbonnementModel();
    if(!this.route.snapshot.paramMap.get('id1')){
      this.abonnerservice.getOneType(this.route.snapshot.paramMap.get('id')).subscribe(
        (data:AbonnerModel)=>{

         this.abonnement.abonne_id=data.id});

    }else {
      this.selected=[];
      this.selecte2=[];
      
      this.abonnementservice.getOneType(this.route.snapshot.paramMap.get('id1')).subscribe(
        (data:AbonnementModel)=>{
          
          this.abonnement=data;
          console.log(data);

          this.prodab.getProdAbbyAbonnement(data.id).subscribe(
            (data:any)=>{
              console.log(data)

                for(let b of data){
                  for(let a of this.items){
                  if(a.id==b.produit_id){
                    a.idx=b.id;
                      a.qte=b.nombre;
                      a.ancien=1;
                      a.cocher=true;
                
                      this.selecte2.push({libelle:a.libelle});

                  }
                }
              }
    this.selected=this.selecte2;
            /* this.selected=[
                {libelle:this.items[0].libelle},
                {libelle:this.items[1].libelle}
              ];*/
            // this.getValues();
          /*    for(let a of this.selected){
                a.cocher=true;
              }*/
             /*  console.log(this.selected);


            }
          )*/
        }
      );
    
  }
      )}}


 
  insertData(){
    if(this.route.snapshot.paramMap.get('id1')){
      for(let a of this.items.filter((a)=>a.cocher==true)){
        this.abonnement.somme=parseInt(this.abonnement.somme)+(a.qte*a.prix);
      }
      this.abonnement.somme=this.abonnement.somme*this.abonnement.nombreticket;
      this.abonnementservice.updateType(this.route.snapshot.paramMap.get('id1'),this.abonnement).subscribe(
        ()=>{
          console.log("Update avec succes");
          

            if(this.items.filter((a)=>a.cocher==true && !a.ancien).length!=0){
              this.abonnement.tabPr=[];
              this.abonnement.tabqte=[];
              for(let a of this.items.filter((a)=>a.cocher==true && !a.ancien)){
                this.abonnement.tabPr.push(a.id);
                this.abonnement.tabqte.push(a.qte);
        
              }

              this.abonnementservice.insertData(this.abonnement).subscribe(
                () => {


                },
                () => {
                  console.log("false");
                }
              );
            }

          if(this.items.filter((a)=>a.cocher==false && a.ancien==1).length!=0){

            for(let a of this.items.filter((a)=>a.cocher==false && a.ancien==1)){
             
                  this.prodab.deleteData(a.idx).subscribe(
                    ()=>{
                      console.log("cool cool ");
                    }
                  )
            }
          }
          

          if(this.items.filter((a)=>a.cocher==true && a.ancien==1).length!=0){
            for(let a of this.items.filter((a)=>a.cocher==true && a.ancien==1)) {
              console.log(a);
                let x=new ProduitAbonnementModel()
              x.commandeab_id=this.route.snapshot.paramMap.get('id1');
              x.produit_id=a.id;
              x.nombre=a.qte;
              x.id=a.idx;
             
              this.prodab.updateType(x.id,x).subscribe(
                ()=>{
                  console.log("noss");
                }
              )
            }
          }
          this.router.navigate(['/abonnementliste/'+this.route.snapshot.paramMap.get('id')]);
        }
      );


   }else {

      let myDate = new Date();
      this.abonnement.date= this.datePipe.transform(myDate, 'yyyy-MM-dd');;
      this.abonnement.id = null;
    //  this.abonnement.mois = "xxx";
      this.abonnement.tabPr=[];
      this.abonnement.tabqte=[];
      this.abonnement.somme=0;
      for(let a of this.items.filter((a)=>a.cocher==true)){
        this.abonnement.somme=this.abonnement.somme+(a.qte*a.prix)
        this.abonnement.tabPr.push(a.id);
        this.abonnement.tabqte.push(a.qte);

      }
      this.abonnement.somme=this.abonnement.somme*this.abonnement.nombreticket;
      console.log(this.abonnement);
      this.abonnementservice.insertData(this.abonnement).subscribe(
        () => {
          this.router.navigate(['/abonnementliste/'+this.route.snapshot.paramMap.get('id')]);
         
        },
        () => {
          console.log("false");
        }
      );
    }}
   

      precedentPage(){
        window.history.back();
      }
    }
 /*




  setFileData($event,d){
    this.getBase64($event,d);
  }

  getBase64(event,d) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      d.url=reader.result;
      console.log(d);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

*/

