import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(
    private httpClient:HttpClient
  ) { }



  insertData(data){
    return this.httpClient.post('http://localhost:8000/addintermediaire',data);
  }


}
