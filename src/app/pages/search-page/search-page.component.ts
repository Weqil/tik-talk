import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from "../../components/profile-card/profile-card.component";
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles:Profile[] = []
  constructor(){
    this.profileService.getTestAcounts().subscribe((res:any)=>{
      this.profiles = res
    })
  }
}
