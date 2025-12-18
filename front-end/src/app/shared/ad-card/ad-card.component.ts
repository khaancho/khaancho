import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ad } from '../../core/models/ad.model';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})

export class AdCardComponent {
  @Input() ad!: Ad;
  @Input () imageUrl!: string;
  @Input () title!: string;
  @Input () description!: string;
  @Input () price!: number;
  @Input () location!: string;
  @Input () category!: string;
  @Input () createdAt!: Date;
  @Input () id!: string;
}