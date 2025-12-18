import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdService } from '../../core/services/ad.service';
import { AdCardComponent } from '../../shared/ad-card/ad-card.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, AdCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user: any = null;
  myAds: any[] = [];

  constructor(private adService: AdService, private authService: AuthService) {}

  ngOnInit(): void {
this.authService.getCurrentUser().subscribe((user: any) => {
  this.user = user;

  this.adService.getAdsByUser().subscribe(
        ads => {
          this.myAds = ads;
        },
        err => {
          console.error('Error fetching user ads:', err);
  });
});
}
}