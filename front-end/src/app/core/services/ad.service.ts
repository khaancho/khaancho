import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdService {
private dummyAds = [
    {
      id: '1',
      title: 'Used iPhone 12',
      description: 'In good condition. Comes with box.',
      price: '85000',
      category: 'Electronics',
      location: 'Kathmandu',
      imageUrl: 'https://via.placeholder.com/300x200',
      postedOn: '2025-05-10'
    },
    {
      id: '2',
      title: 'Mountain Bike',
      description: 'Brand new condition. Rarely used.',
      price: '55000',
      category: 'Vehicles',
      location: 'Lalitpur',
      imageUrl: 'https://via.placeholder.com/300x200',
      postedOn: '2025-05-12'
    },
    // Add more dummy data as needed
  ];

  private api = 'http://localhost:5000/api/ads';

  constructor(private http: HttpClient) {}

  // ✅ Get all ads from backend
  getAllAds(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // ✅ Get ad by ID from backend
  getAdById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // ✅ Get ads filtered by category
  getAdsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?category=${category}`);
  }

  // ✅ Get ads searched by keyword
  searchAds(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?q=${keyword}`);
  }

  // ✅ Post new ad
postAd(adData: any): Observable<any> {
  const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return this.http.post(this.api, adData, { headers });
}

// ✅ Get ads posted by the logged-in user
getAdsByUser(): Observable<any[]> {
  const token = localStorage.getItem('token'); // get token from storage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.api}/my-ads`, { headers });
}
}