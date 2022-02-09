import { Pipe, PipeTransform } from '@angular/core';
import {LowerCasePipe} from "@angular/common";

@Pipe({
  name: 'abonnerpipe'
})

export class abonnerpipe implements PipeTransform {

  transform(tabcom: any,mot:any): any {
    console.log(tabcom);
    if(mot){
         tabcom=tabcom.filter(a=>
           a.nom.toLowerCase().indexOf(mot.toLowerCase())!=-1 ||
           a.numero.toLowerCase().indexOf(mot.toLowerCase())!=-1 
          
         );
        // console.log(tabcom);

     }

    return tabcom;
  }
}

