import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Login } from '../../data/interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  authService:AuthService = inject(AuthService)
  loginForm = new FormGroup ({
    username: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required)
  })
  onSubmit(){
    let fd = new FormData()
    //@ts-ignore
    fd.append('username' ,this.loginForm.value.username)
    //@ts-ignore
    fd.append('password' ,this.loginForm.value.password)
    if(this.loginForm.valid){
      //@ts-ignore
      this.authService.login(fd).pipe().subscribe((res:Login)=>{
        this.authService.setAuthToken(res.access_token)
        this.authService.setRefreshToken(res.refresh_token)
        inject(Router).navigate([''])
      })
    }
   
  }
}
