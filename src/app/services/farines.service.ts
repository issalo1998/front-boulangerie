import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarineService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/farine');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/farine',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/farine/'+id);
  }

  getOne(id){
    return this.httpClient.get('http://localhost:8000/farine/'+id);
  }

  updateFarine(id,data){
    return this.httpClient.patch('http://localhost:8000/farine/'+id,data);
  }
}
