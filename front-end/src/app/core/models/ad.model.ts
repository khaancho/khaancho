export interface Ad {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: {
    city: string;
    area: string;
  };
  imageUrl: string[];
  userId?: {
    id: string;
    name: string;
    email?: string;
  }
  contact: {
    phone: string;
    email?: string;
  };
  createdAt: Date;
  postedAt?: Date;
  status?: 'active' | 'sold' | 'pending' | 'archived';
  views?: number;
  isFeatured?: boolean;
  tags?: string[];
  slug?: string;
  expiryDate?: Date;
}
