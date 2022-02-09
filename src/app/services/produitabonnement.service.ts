import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitAbonnementService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/produitcommandeabs');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/produitcommandeabs',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/produitcommandeabs/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/produitcommandeabs/'+id);
  }

  updateType(id,data){
    return this.httpClient.put('http://localhost:8000/produitcommandeabs/'+id,data);
  }

  getProdAbbyAbonnement(id){
    return this.httpClient.get('http://localhost:8000/produitcommandeabs/getProdAbbyAbonnement/'+id);
  }
}
