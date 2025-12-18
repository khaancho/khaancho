import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  adId!: string;
  adData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.adId = this.route.snapshot.paramMap.get('id') || '';

    // Dummy ad data – replace this with API call later
    this.adData = {
      id: this.adId,
      title: 'Used iPhone 12',
      description: 'In great condition. Includes charger and case.',
      price: '85000',
      location: 'Kathmandu, Nepal',
      imageUrl: 'https://via.placeholder.com/600x400',
      postedOn: '2025-05-12',
      contact: '9812345678'
    };
  }
}
