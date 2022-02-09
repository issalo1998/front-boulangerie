import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { ActivatedRoute } from '@angular/router';
import { CommandeModel } from '../models/commande';
import { TypeService } from '../services/types.service';
import { ProduitService } from '../services/produit.service';
import { TypeModel } from '../models/type.model';
import { ProduitModel } from '../models/produit.model';
import { AbonnerService } from '../services/abonner.service copy';
import { AbonnerModel } from '../models/abonner';
import { DatePipe } from '@angular/common';
import {ProduitCommandeService} from "../services/produitcommande.service";
import {ProduitCommandeModel} from "../models/ProduitCommande";

@Component({
  selector: 'app-commandeUpdate',
  templateUrl: './commandeUpdate.component.html',
  styleUrls: ['./commande.component.css'],
  providers: [DatePipe]
})
export class CommandeUpdateComponent implements OnInit {
    selected: any;
    produits: any[];
     selected2=[];
    commande = new CommandeModel();


    constructor(
        private commandeservice: CommandeService,
        private produitcommandeservice: ProduitCommandeService,
        private produitservice: ProduitService,
        private datePipe: DatePipe,
        private route: ActivatedRoute
    ) {
    }


    getValues1() {

        for (let a of this.produits) {
            a.cocher = false;
        }
        for (let a of this.selected) {
            a.cocher = true;
        }
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



        this.produitservice.getProduit().subscribe(
            (data: any) => {
                console.log(data);
                this.produits = data;
            }
        );

        if (!this.route.snapshot.paramMap.get('id1')) {

            for (let a of this.produits) {
                a.quantite = 0;
            }

        } else {
            this.selected = [];
            this.selected2=[];

            this.commandeservice.getOne(this.route.snapshot.paramMap.get('id1')).subscribe(
                (data: CommandeModel) => {

                    this.commande = data;

                    this.produitcommandeservice.getProduitCommande(data.id).subscribe(
                        (data: any) => {
                            for (let b of data) {

                                for (let a of this.produits) {
                                    if (a.id == b.produit_id) {
                                        a.idcomprod=b.id;
                                        a.quantite = b.nombre;
                                        a.ancien = 1;
                                        a.cocher = true;
                                        this.selected2.push(a);
                                    }
                                }
                            }
                            this.selected = this.selected2;
                            this.selected2=[];
                        }
                    );

                }
            )
        }
    }


    insertData() {
        if (this.route.snapshot.paramMap.get('id1')) {

            if (this.produits.filter((a) => a.cocher == true && !a.ancien).length != 0) {
                for (let a of this.produits.filter((a) => a.cocher == true && !a.ancien)) {
                    let x = new ProduitCommandeModel()
                    x.commande_id = this.route.snapshot.paramMap.get('id1');
                    x.produit_id = a.id;
                    x.nombre = a.quantite;
                    console.log("pppp");
                    this.produitcommandeservice.insertData(x).subscribe(
                        () => {
                        }
                    )
                }
            }


            if (this.produits.filter((a) => a.cocher == false && a.ancien == 1).length != 0) {
                console.log("wwwwww");
                for (let a of this.produits.filter((a) => a.cocher == false && a.ancien == 1)) {
                    console.log(a.idcomprod);
                    this.produitcommandeservice.deleteData(a.idcomprod).subscribe(
                        () => {
                            console.log("cool cool ");
                        }
                    )
                }
            }


            if (this.produits.filter((a) => a.cocher == true && a.ancien == 1).length != 0) {
                for (let a of this.produits.filter((a) => a.cocher == true && a.ancien == 1)) {
                    let x = new ProduitCommandeModel()
                    x.commande_id = this.route.snapshot.paramMap.get('id1');
                    x.produit_id = a.id;
                    x.nombre = a.quantite;
                    x.id = a.idcomprod;
                    this.produitcommandeservice.update(x.id, x).subscribe(
                        () => {
                            console.log("noss");
                        }
                    )
                }
            }

            this.precedentPage();

        } else {

            console.log("bbbb");
            let myDate = new Date();
            this.commande.date = this.datePipe.transform(myDate, 'yyyy-MM-dd');
            this.commande.numero = "xxx";
            this.commande.tabPr = [];
            this.commande.tabQt = [];
            for (let a of this.produits.filter((a) => a.cocher == true)) {
                this.commande.tabPr.push(a.id);
                this.commande.tabQt.push(a.quantite);
            }
            console.log(this.commande);
            this.commandeservice.insertData(this.commande).subscribe(
                () => {
                    this.precedentPage();

                },
            );
        }


    }

    precedentPage() {
        window.history.back();
    }
}
