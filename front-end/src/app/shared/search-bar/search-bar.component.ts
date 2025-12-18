import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query: string = '';

  constructor(private router: Router) {}
  
  onSearch(): void {
    if (this.query.trim()) {
      this.router.navigate(['/category', this.query.trim().toLowerCase()]);
    } 
  }
}
