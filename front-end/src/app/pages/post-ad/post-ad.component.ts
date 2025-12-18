import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdService } from '../../core/services/ad.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-post-ad',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  adForm: FormGroup;
  categories: string[] = [];
  isCustomCategory = false;
  customCategory = '';
  filteredCategories: string[] = [];

  isSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private adService: AdService,
    private categoryService: CategoryService  
  ) {
    this.adForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: [''],
      postedBy: ['']
    });
  }

ngOnInit(): void {
  this.categoryService.getAllCategories().subscribe({
    next: (data) => {
      console.log('Categories from backend:', data);  // <-- Add this
      this.categories = data;
    },
    error: (err) => console.error('Failed to load categories:', err)
  });
}

//  selectSuggestedCategory(cat: string): void { // ← STEP 4
//    this.customCategory = cat;
//    this.filteredCategories = [];
//  }

  selectSuggestedCategory(category: string): void {
    this.customCategory = category;
    this.adForm.patchValue({ category: category });
    this.filteredCategories = []; // Clear suggestions after selection
    this.isCustomCategory = false; // hide custom input field
}

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.isCustomCategory = value === '__other__';

    if (!this.isCustomCategory) {
      this.adForm.patchValue({ category: value });
    } else {
      this.adForm.patchValue({ category: '' }); // reset category value
    }
  }

  handleCustomCategoryInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const inputValue = input.value;
  this.customCategory = input.value;
  this.adForm.patchValue({ category: this.customCategory.trim() });

  this.filteredCategories = this.categories.filter(cat =>
    cat.toLowerCase().includes(inputValue.toLowerCase())
  );
}

  onSubmit(): void {
    this.isSubmitted = true;

    // Use custom category if entered
    if (this.isCustomCategory && this.customCategory.trim()) {
      this.adForm.patchValue({ category: this.customCategory.trim() });
    }

  // this.isSubmitted = true;

    if (this.adForm.valid) {
      this.adService.postAd(this.adForm.value).subscribe({
        next: (res: any) => {
          this.successMessage = 'Ad posted successfully!';
          this.errorMessage = '';
          this.adForm.reset();
          this.isSubmitted = false;
          this.isCustomCategory = false;
          this.customCategory = '';          
        },
        error: (err: any) => {
          this.errorMessage = 'Failed to post ad. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.adForm.markAllAsTouched();
    }
  }
}
