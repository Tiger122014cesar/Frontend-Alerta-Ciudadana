import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = `${environment.backendURL}/usuarios`;
  constructor(private http: HttpClient, private router:Router) { }
  
  getUsuarios(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
  getUsuario(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postUsuario(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
  putUsuario(formData:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,formData);
  }
  deleteUsuario(id:number, estado:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
