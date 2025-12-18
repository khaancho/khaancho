import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdService } from '../../core/services/ad.service';
import { AdCardComponent } from '../../shared/ad-card/ad-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-home',
  imports: [ CommonModule, AdCardComponent, ReactiveFormsModule, MatCardModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ads: any[] = [];
  filteredAds: any[] = [];
  categories = ['All', 'Electronics', 'Vehicles'];
  selectedCategory = 'All';

  currentPage = 1;
  pageSize = 6;

  constructor(private adService: AdService) {}

  ngOnInit(): void {
    this.adService.getAllAds().subscribe(data => {
      this.ads = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredAds = this.selectedCategory === 'All'
      ? [...this.ads]
      : this.ads.filter(ad => ad.category === this.selectedCategory);

    this.currentPage = 1;
  }

  get paginatedAds(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAds.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.filteredAds.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
