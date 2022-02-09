import { Component, OnInit } from '@angular/core';
import {TypeService} from '../services/types.service';
import {VagueModel} from '../models/vague.model';
import {VagueService} from '../services/vague.service';
import {ProdSelectedModel} from '../models/prodselected.model';
import {IntermediaireModel} from '../models/intermediaire.model';
import {Router} from '@angular/router';
import {SearchModel} from '../models/search.model';
import {formatDate} from '@angular/common';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import Swal from 'sweetalert2';




@Component({
    selector: 'app-vagues',
    templateUrl: './vagues.component.html',
    styleUrls: ['./vagues.component.css']
})
export class VaguesComponent implements OnInit {

    search=new SearchModel();
    types : any;
    prodList:any;
    vagues:any;
    disable=true;
    vagues1:any;
    vague= new VagueModel();
    prodselected=new ProdSelectedModel();
    intermediaire =new IntermediaireModel();
    somme=0;




    constructor(private router : Router, private typeservice : TypeService,private vagueservice :VagueService,private dialog: MatDialog) { }


    ngOnInit(){
            this.returnProduits();
            this.getTypes();
    }


    prodSelect(){

        this.getProdById();
    }




    getTypes(){
        this.typeservice.getData().subscribe(
            res=>{
                this.types= res;
            }
        );
    }

    returnProduits(){
        this.vagueservice.getProdByType(4).subscribe(
            res=>{
                this.prodList=res;
                for(let prod of this.prodList){
                    prod.statut=false;
                    prod.nombre=0;
                    prod.plus=0;
                    prod.vente=0;
                    prod.reste=0;
                    prod.total=0;
                    prod.cumul=0;
                }
            }
        );
    }

    getProdById(){
        for(let prod of this.prodList){
            if(prod.id==this.prodselected.id) {
                prod.statut=false
            }
        }
    }

    hidden(){
        this.vagueservice.getProdByType(1).subscribe(
            res=> {
                this.prodList = res;
            }
        )
    }

    cancel(id){

        for(let prod of this.prodList){
            if(prod.id==id) {
                prod.statut=true;

            }
        }
    }

    selectHoraire(){
        this.vagueservice.getSommeBoul(this.vague.horaire,formatDate(new Date(),'yyyy-MM-dd','en-FR')).subscribe(
            res=> {
                if (res[0] != undefined) {
                    this.disable = true;
                    Swal.fire("Une vague de boulangerie a deja ete cree pour le "+this.vague.horaire);
                    this.vague.horaire=null;
                }else{
                    this.disable = false;
                }
            }
        );
    }




    addVague() {


        if (this.vague.horaire != undefined) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bien Enregistrée',
                showConfirmButton: false,
                timer: 1500
            });
            this.disable=true;
            this.vague.type_id = 4;
            this.vague.created_at = formatDate(new Date(),'yyyy-MM-dd','en-FR');
            this.vague.somme = 0;
            this.vagueservice.insertData(this.vague).subscribe(
                res => {

                    for(let prod of this.prodList){
                        if(prod.nombre==undefined){
                            prod.nombre=0;
                        }
                        if(prod.plus==undefined){
                            prod.plus=0;
                        }
                        if(prod.reste==undefined){
                            prod.reste=0;
                        }
                    }
                    for (let prod of this.prodList) {
                        if (prod.statut == false) {
                            prod.total = prod.nombre * prod.contenu + prod.plus;
                            prod.vente = prod.total - prod.reste;
                            prod.cumul = prod.prix * prod.vente;
                        }
                    }


                    this.vagueservice.getLastVague().subscribe(
                        (res) => {
                            console.log(res);
                            for (let prod of this.prodList) {
                                if (prod.statut == false) {
                                    console.log(res[0].id);
                                    this.intermediaire.vague_id = res[0].id;
                                    this.intermediaire.nombre = prod.nombre;
                                    this.intermediaire.vente = prod.vente;
                                    this.intermediaire.plus = prod.plus;
                                    this.intermediaire.reste = prod.reste;
                                    this.intermediaire.cumul = prod.cumul;
                                    this.intermediaire.total = prod.total;
                                    this.intermediaire.prod_id = prod.id;
                                    this.intermediaire.prod_prix= prod.prix;
                                    this.intermediaire.reste_prec=0;
                                    this.somme = this.somme + prod.cumul;
                                    this.vagueservice.addIntermediaire(this.intermediaire).subscribe(
                                        res => {
                                            this.intermediaire = new IntermediaireModel();

                                        }
                                    );
                                }
                            }
                        }
                    );

                    this.vague.somme = this.vague.somme + this.somme;
                    this.vagueservice.updateVague(res[0].id, this.vague).subscribe(
                        res => {

                            this.router.navigate(["/listevagues/"]);
                        }
                    );
                }
            );

        }else{
            Swal.fire("Veuillez choisir l'horaire");

        }
    }












}
