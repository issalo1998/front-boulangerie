import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(
    private httpClient:HttpClient
  ) { }
  
  getProduit(){
    return this.httpClient.get('http://localhost:8000/getProduit');
  }


  getProduitByType(id){
    return this.httpClient.get('http://localhost:8000/produit/'+id);
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/addproduit',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/deleteproduit/'+id);
  }

  getOneProduit(id){
    return this.httpClient.get('http://localhost:8000/getoneproduit/'+id);
  }

  updateProduit(id,data){
    return this.httpClient.patch('http://localhost:8000/updateproduit/'+id,data);
  }


}
