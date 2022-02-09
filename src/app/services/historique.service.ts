import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/historique');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/historique',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/historique/'+id);
  }

  getOne(id){
    return this.httpClient.get('http://localhost:8000/historique/'+id);
  }

  update(id,data){
    return this.httpClient.patch('http://localhost:8000/historique/'+id,data);
  }

  gethistobyfarine(id){
    return this.httpClient.get('http://localhost:8000/historiqueByFarine/'+id);
  }
}
