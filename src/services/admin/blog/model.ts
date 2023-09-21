export interface Blog {
  id: number;
  name: string;
  short_description: string;
  content: string;
  category: Category | null;
  tags: string[];
  image_url: string;
  slug: string;
  seo: SEO;
  views: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  name: string;
}

export interface SEO {
  meta_title: string;
  meta_description: string;
}
