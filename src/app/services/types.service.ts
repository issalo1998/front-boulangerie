import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/type');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/addtype',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/deletetype/'+id);
  }

  getOneType(id){
    return this.httpClient.get('http://localhost:8000/getonetype/'+id);
  }

  updateType(id,data){
    return this.httpClient.patch('http://localhost:8000/updatetype/'+id,data);
  }
}
