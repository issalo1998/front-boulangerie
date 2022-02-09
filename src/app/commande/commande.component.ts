import { Component, OnInit } from '@angular/core';
import { CommandeModel } from '../models/commande';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  mot="";
  commandes:CommandeModel[];
  p: number = 1;

  constructor(private commandeservice:CommandeService,
            
              ) {

  }

  ngOnInit() {

    this.LoadTable();
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
  LoadTable(){
    this.commandeservice.getData().subscribe(
      (data:CommandeModel[])=>{
        this.commandes=data;
      }
    )
  }
  delete(id){
    this.commandeservice.deleteData(id).subscribe(
      ()=>{
        this.LoadTable();
      }
    )
  }

  facture(id){
      this.commandeservice.facture(id).subscribe(
          ()=>{

          }
      )
  }


}
