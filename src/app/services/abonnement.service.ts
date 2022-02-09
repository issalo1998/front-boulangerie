import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/commandeabs');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/commandeabs',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/commandeabs/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/commandeabs/'+id);
  }

  updateType(id,data){
    return this.httpClient.put('http://localhost:8000/commandeabs/'+id,data);
  }
 
  getcommande(id){
    return this.httpClient.get('http://localhost:8000/getcommande/'+id);
  }
  getfacture(id,id1){
    return this.httpClient.get('http://localhost:8000/showPdf/'+id+'/'+id1);
  }
  getpositionMois(id){
    console.log(id);
    return this.httpClient.get('http://localhost:8000/getpositionMois/'+id);
  }
  getabonnementmois(id){
    return this.httpClient.get('http://localhost:8000/getabonnementmois/'+id);
  }
 
}
