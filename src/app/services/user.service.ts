import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/user');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/adduser',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/deleteuser/'+id);
  }

  getOneUser(id){
    return this.httpClient.get('http://localhost:8000/getoneuser/'+id);
  }

  updateUser(id,data){
    return this.httpClient.patch('http://localhost:8000/updateuser/'+id,data);
  }

  getProfils(){
    return this.httpClient.get('http://localhost:8000/profil');
  }

  getUserProfil(id){
    return this.httpClient.get('http://localhost:8000/getprofil/'+id);
  }
}
