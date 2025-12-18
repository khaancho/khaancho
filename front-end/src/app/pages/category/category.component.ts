import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../core/services/ad.service';
import { AdCardComponent } from '../../shared/ad-card/ad-card.component';

@Component({
  selector: 'app-category',
  imports: [CommonModule, AdCardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName!: string;
  ads: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private adService: AdService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      this.loadCategoryAds();
    });
  }

loadCategoryAds(): void {
  if (this.categoryName) {
    this.adService.searchAds(this.categoryName).subscribe(data => {
      this.ads = data;
    });
  } else {
    // fallback: load all ads
    this.adService.getAllAds().subscribe(data => {
      this.ads = data;
    })
}
}
}