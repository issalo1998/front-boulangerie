import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitCommandeService {

  constructor(
      private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/produitcommande');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/produitcommande',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/produitcommande/'+id);
  }

  getOne(id){
    return this.httpClient.get('http://localhost:8000/produitcommande/'+id);
  }

  update(id,data){
    return this.httpClient.patch('http://localhost:8000/produitcommande/'+id,data);
  }

  getProduitCommande(id){
    return this.httpClient.get('http://localhost:8000/getproduitcommande/'+id);
  }

}


