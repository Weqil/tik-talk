import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutPageComponent } from './common-ui/layout-page/layout-page.component';
import { canActivateAuth } from './guards/auth.guard';

export const routes: Routes = [

   
    {path:'',component:LayoutPageComponent, children: [
        {path:'', component:SearchPageComponent,},
        {path:'profile', component:ProfilePageComponent,}, 
    ],
    canActivate:[canActivateAuth]
},

    {path:"login",component:LoginPageComponent}
  
];
