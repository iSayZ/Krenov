export interface Realisation {
  _id: string;
  order: number;
  slug: string;
  title: string;
  desc: string;
  content: string;
  header: string;
  imageUrls: string[];
  tags: string[];
  status: 'active' | 'desactive' | 'draft';
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
