import { Pipe, PipeTransform } from '@angular/core';
import {LowerCasePipe} from "@angular/common";

@Pipe({
  name: 'commanderpipe'
})

export class commanderpipe implements PipeTransform {

  transform(tabcom: any,mot:any): any {
    console.log(tabcom);
    if(mot){
         tabcom=tabcom.filter(a=>
           a.numero.toLowerCase().indexOf(mot.toLowerCase())!=-1 ||
           a.date.toLowerCase().indexOf(mot.toLowerCase())!=-1 
          
         );
        // console.log(tabcom);

     }

    return tabcom;
  }
}

