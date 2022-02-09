import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getData(){
    return this.httpClient.get('http://localhost:8000/profil');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/addprofil',data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/deleteprofil/'+id);
  }

  getOneProfil(id){
    return this.httpClient.get('http://localhost:8000/getoneprofil/'+id);
  }

  updateProfil(id,data){
    return this.httpClient.patch('http://localhost:8000/updateprofil/'+id,data);
  }
}
