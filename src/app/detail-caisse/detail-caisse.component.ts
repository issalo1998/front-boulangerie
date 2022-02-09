import { Component, OnInit } from '@angular/core';
import {VagueService} from "../services/vague.service";
import {CaisseModel} from "../models/caisse.model";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-detail-caisse',
  templateUrl: './detail-caisse.component.html',
  styleUrls: ['./detail-caisse.component.css']
})
export class DetailCaisseComponent implements OnInit {

  caisse=new CaisseModel();
  id=this.route.snapshot.params['id'];

  constructor(private vagueservice : VagueService,private  route:ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.getCaisse(this.id);
  }

  getCaisse(id){
    this.vagueservice.getOneCaisse(this.id).subscribe(
      res=>{
        this.caisse=res[0];
        this.caisse.created_at=formatDate(this.caisse.created_at,'dd/MM/yyyy','en-FR');
      }
    )
  }

  redirect(){
    this.router.navigate(["/listecaisses"]);
  }


}
