import { inject } from "@angular/core"
import { AuthService } from "../auth/auth.service"
import { Router } from "@angular/router"

export const canActivateAuth = ()=>{
    const isLoggedIn = inject(AuthService).getAuth()
    if(isLoggedIn){
        return true
    }
    return inject(Router).navigate(['/login'])
}