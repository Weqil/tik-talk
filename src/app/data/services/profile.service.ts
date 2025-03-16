import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http:HttpClient = inject(HttpClient)
  constructor() { }
  getTestAcounts(){
  
    return this.http.get<Profile[]>(`${environment.baseApiUrl}account/test_accounts`)
  }
}
