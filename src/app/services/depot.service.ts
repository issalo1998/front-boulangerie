import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/depot');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/depot',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/depot/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/depot/'+id);
  }
  getdepotmois(id){
    return this.httpClient.get('http://localhost:8000/getdepotmois/'+id);
  }
  
  updateType(id,data){
    return this.httpClient.put('http://localhost:8000/depot/'+id,data);
  }
}
