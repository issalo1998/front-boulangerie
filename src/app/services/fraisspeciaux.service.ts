import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FraisspeciauxService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/fraisspeciaux');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/fraisspeciaux',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/fraisspeciaux/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/fraisspeciaux/'+id);
  }

  updateType(id,data){
    return this.httpClient.put('http://localhost:8000/fraisspeciaux/'+id,data);
  }

  getfraismois(id){
    return this.httpClient.get('http://localhost:8000/getfraismois/'+id);
  }
  
}
