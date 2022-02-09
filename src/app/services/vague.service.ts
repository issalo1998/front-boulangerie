import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VagueService {

  constructor(
    private httpClient:HttpClient
  ) { }


  getProdByType(id){
    return this.httpClient.get('http://localhost:8000/getprodbytype/'+id);
  }

  getData(id){
    return this.httpClient.get('http://localhost:8000/vague/'+id);
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/addvague',data);
  }
  addIntermediaire(data){
    return this.httpClient.post('http://localhost:8000/addintermediaire',data);
  }

  getOneVague(id){
    return this.httpClient.get('http://localhost:8000/getonevague/'+id);
  }

  getLastVague(){
    return this.httpClient.get('http://localhost:8000/getlastvague');
  }

  updateVague(id,data){
    return this.httpClient.patch('http://localhost:8000/updatevague/'+id,data);
  }

   deleteData(id){
    return this.httpClient.delete('http://localhost:8000/deletevague/'+id);
  }

  getIntermediairesByVague(id){
    return this.httpClient.get('http://localhost:8000/getintermediairesbyvague/'+id);
  }

  getIntermediairesDetails(id){
    return this.httpClient.get('http://localhost:8000/getintermediairesdetails/'+id);
  }

  deleteIntermediaire(id){
    return this.httpClient.delete('http://localhost:8000/deleteintermediaire/'+id);
  }

  updateIntermediaire(id,data){
    return this.httpClient.patch('http://localhost:8000/updateintermediaire/'+id,data);
  }

  getTypeVague(id){
    return this.httpClient.get('http://localhost:8000/gettypevague/'+id);
  }

  getLastReste(id){

    return this.httpClient.get('http://localhost:8000/getlastreste/'+id);
  }

  getSommeBoul(horaire,date){
    return this.httpClient.get('http://localhost:8000/getsommeboul/'+horaire+'/'+date);
  }
  getSommePat(horaire,date){
    return this.httpClient.get('http://localhost:8000/getsommepat/'+horaire+'/'+date);
  }
  getNbre(id,horaire,date,type){
    return this.httpClient.get('http://localhost:8000/getnbre/'+id+'/'+horaire+'/'+date+'/'+type);
  }

  insertCaisse(data){
    return this.httpClient.post('http://localhost:8000/addcaisse',data);
  }

  getCaisses(){
    return this.httpClient.get('http://localhost:8000/caisse');
  }

  deleteCaisse(id){
    return this.httpClient.delete('http://localhost:8000/deletecaisse/'+id);
  }

  getOneCaisse(id){
    return this.httpClient.get('http://localhost:8000/getonecaisse/'+id);
  }

  updateCaisse(id,data){
    return this.httpClient.patch('http://localhost:8000/updatecaisse/'+id,data);
  }

  getCaisseByHoraire(id,horaire,date){
    return this.httpClient.get('http://localhost:8000/getcaissebyhoraire/'+id+'/'+horaire+'/'+date);
  }
  getcaissedumois(id){
    return this.httpClient.get('http://localhost:8000/getcaissedumois/'+id);
  }
  getdatemois(id){
    return this.httpClient.get('http://localhost:8000/getdatemois/'+id);
  }

}
