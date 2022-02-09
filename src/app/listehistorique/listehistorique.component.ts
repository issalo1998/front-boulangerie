import { Component, OnInit } from '@angular/core';
import {HistoriqueService} from "../services/historique.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FarineService} from "../services/farines.service";
import { FarineModel } from '../models/farine';

@Component({
  selector: 'app-listehistorique',
  templateUrl: './listehistorique.component.html',
  styleUrls: ['./listehistorique.component.css']
})
export class ListehistoriqueComponent implements OnInit {

  constructor(private router : Router,private  route:ActivatedRoute,private historiqueService : HistoriqueService,private farineService : FarineService) { }

  histoList : any;
  id:any;
  nom:any;

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getData();
    this.getNomFarine();
  }

  getData(){
    this.historiqueService.gethistobyfarine(this.id).subscribe(
        res=>{
            this.histoList = res;
        }
    )
  }

  getNomFarine(){
      this.farineService.getOne(this.id).subscribe(
          (res:FarineModel)=>{
              this.nom = res.libelle;
          }
      )
  }

  redirect(id,idhisto){
      this.router.navigate(["/entreesorties/"+id+"/"+idhisto]);
  }




}
