import { HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, EMPTY, switchMap, tap, throwError } from "rxjs";
import { Login } from "../data/interfaces/login";

export const authTokenInterceptor:HttpInterceptorFn = (req,next)=>{
    let authService:AuthService = inject(AuthService)
    let token:string|null = authService.token
    let isRefreshing:boolean = false
    const refreshAndProcced = (AuthService:AuthService,req:HttpRequest<any>, next:HttpHandlerFn)=>{
        if(!isRefreshing){
            isRefreshing = true
            return authService.refreshAuthToken().pipe(
                tap((token:Login)=>{
                    authService.setAuthToken(token.access_token)
                    authService.setRefreshToken(token.refresh_token)
                    req = req.clone({
                        setHeaders:{
                            Authorization:`Bearer ${token.access_token}`
                        }
    
                    })
                    
                }),
                catchError((err)=>{
                    authService.logout()
                    return throwError(err)
                }),
                switchMap(()=>{
                    isRefreshing = false
                    return next(req)
                })
            )
        }
        
        return EMPTY
       
    }
    if(!token){
        console.log(token)
        return next(req)
    } else{
     req = req.clone({
        setHeaders:{
            Authorization:`Bearer ${token}`
        }
     })
     if(isRefreshing){
        return refreshAndProcced(authService,req,next)
     }

       return next(req).pipe(
        catchError((err:any)=>{
            if(err.status === 403){
                return refreshAndProcced(authService,req,next)
            }
            return throwError(err)
        })
       )
       
    }


   
}