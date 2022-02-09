import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/commande');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/commande',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/commande/'+id);
  }

  getOne(id){
    return this.httpClient.get('http://localhost:8000/commande/'+id);
  }

  update(id,data){
    return this.httpClient.patch('http://localhost:8000/commande/'+id,data);
  }

  facture(id){
    return this.httpClient.get('http://localhost:8000/showcommandePdf/'+id);
  }
}
