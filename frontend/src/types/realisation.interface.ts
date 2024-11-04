export interface Realisation {
  _id: string;
  order: number;
  slug: string;
  title: string;
  content: string;
  header: string;
  imageUrls: string[];
  tags: string[];
  status: 'active' | 'desactive' | 'draft';
  author: string;
  created_at: Date;
  updated_at: Date;
}
