import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbonnerService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/abonnes');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/abonnes',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/abonnes/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/abonnes/'+id);
  }

  updateType(id,data){
    return this.httpClient.put('http://localhost:8000/abonnes/'+id,data);
  }
}
