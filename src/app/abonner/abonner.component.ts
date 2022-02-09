import { Component, OnInit } from '@angular/core';
import { AbonnerModel } from '../models/abonner';
import { AbonnerService } from '../services/abonner.service copy';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abonner',
  templateUrl: './abonner.component.html',
  styleUrls: ['./abonner.component.css']
})
export class AbonnerComponent implements OnInit {
  mot="";
  clients:AbonnerModel[];
  p: number = 1;
  avatar = 'assets/assets/img/avatars/user.png';
 

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
  constructor(private abonnerservice : AbonnerService){

  }
  LoadTable(){
    this.abonnerservice.getData().subscribe(
      (data:AbonnerModel[])=>{
        this.clients=data;
        console.log(this.clients);
      
      }
    )
  }
  delete(id){
    this.abonnerservice.deleteData(id).subscribe(
      ()=>{
        this.LoadTable();
      }
    )
  }



  deleteSupprimer(id){
    Swal.fire({title: 'Etes-vous sûre de vouloir supprimer?', showCancelButton: true}).then(result => {
      if (result.value) {
        this.delete(id);
        // handle Confirm button click
        // result.value will contain `true` or the input value
      } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    })
    /* Swal.fire({
       title: 'Êtes-vous sûr de vouloir supprimer.',
       text: "A revoir ...",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
       if (result.value) {
         this.delete(id);
         Swal.fire(
           'Supprimé!',
           'Supprimé avec succès',
           'success'
         )
       }else {

       }
     })*/
  }




}
