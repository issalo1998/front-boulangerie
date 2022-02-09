import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VagueService} from '../services/vague.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  constructor(private router : Router, private vagueservice:VagueService , private  route:ActivatedRoute) { }


  id=this.route.snapshot.params['id'];
  intermediaires:any;
  typevague:any;
  datevague:any;
  somme=0;

  ngOnInit() {
    this.getIntermediaires();
    this.getTypeVague();
  }

  redirect(){

    this.router.navigate(["/listevagues2"]);


  }


  getIntermediaires(){
    this.vagueservice.getIntermediairesDetails(this.id).subscribe(
      res=> {
        this.intermediaires = res;
        console.log(this.intermediaires);
        for(let inter of this.intermediaires){
          this.somme = this.somme + inter.cumul;
        }

      }
    );
  }

  getTypeVague(){
    this.vagueservice.getTypeVague(this.id).subscribe(
      res=>{
        this.typevague=res[0].libelle.toUpperCase();
        this.datevague=formatDate(res[0].created_at,'dd/MM/yyyy','en-FR');
        console.log(this.datevague);
      }
    )
  }

}
