import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../data/interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  coockieService:CookieService = inject(CookieService)
  http:HttpClient = inject(HttpClient)
  token: string|null = this.getTokenInCoockie()
  refreshToken:  string|null = this.getTokenInCoockie()
  

  getAuth(){
    if(!this.token){
      this.token = this.coockieService.get('token')
      this.refreshToken = this.coockieService.get('refreshToken')
    }
    return !!this.token
  }

  getTokenInCoockie(){
    return this.coockieService.get('token')
  }
  setAuthToken(token:string){
    this.token = token
    this.coockieService.set('token',token)
  }

  getRefreshToken(){
    return this.coockieService.get('refreshToken')
  }
  refreshAuthToken(){
    return this.http.post<Login>(`${environment.baseApiUrl}auth/refresh`,{refresh_token:this.refreshToken})
  }

  setRefreshToken(token:string){
    this.coockieService.set('refreshToken', token)
  }

  login(payload:FormData){
    return this.http.post<Login>(`${environment.baseApiUrl}auth/token`,payload)
  }

  logout(){
    this.coockieService.deleteAll()
    this.token = null
    this.refreshToken = null
    inject(Router).navigate(['/login'])
  }

}
