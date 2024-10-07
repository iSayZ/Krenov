export interface Realisation {
  _id: string;
  order: number;
  slug: string;
  title: string;
  content: string;
  imageUrls: string[];
  tags: string[];
  status: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
