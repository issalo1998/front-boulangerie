import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Route, Router} from "@angular/router";
import { AbonnerModel } from '../models/abonner';
import { AbonnerService } from '../services/abonner.service copy';

@Component({
  selector: "app-abonnerUpdate",
  templateUrl: "./abonnerUpdate.component.html",

})
export class AbonnerUpdateComponent implements OnInit {

  client:AbonnerModel;
  




  constructor(private abonnerservice:AbonnerService,
              private route: ActivatedRoute) {

  }



  public ngOnInit() {
    const comp = this;
   
    if(!this.route.snapshot.paramMap.get('id')){
      this.client= new AbonnerModel();
     // this.detailmesure=new DetailmesureModel();
     
    }else {

      this.abonnerservice.getOneType(this.route.snapshot.paramMap.get('id')).subscribe(
        (data:AbonnerModel)=>{
        
         this.client=data;
      
         
          
        }
        
      );
    
      
     
  
    }

///////
    var pageHeader = $('.content-header').find('b');
    var adminForm = $('.admin-form');
    var buttons = adminForm.find('.button');
    var Panel = adminForm.find('.panel');
    setTimeout(function () {
      adminForm.addClass('theme-primary');
      Panel.addClass('panel-primary');
      pageHeader.addClass('text-primary');



    }, 800);
    //////
  }


  insertData(){

    if(this.route.snapshot.paramMap.get('id')){
     
        console.log(this.client);
        this.abonnerservice.updateType(this.route.snapshot.paramMap.get('id'),this.client).subscribe(
          ()=>{
            
            console.log("Update avec succes");
            window.history.back();
          }
        )
           
    }else{
    
      this.abonnerservice.insertData(this.client).subscribe(
        ()=>{
          window.history.back();
        },
        ()=>{
          console.log("false");
        }
      );
    }


  }
  precedentPage(){
    window.history.back();
  }
 


  }
