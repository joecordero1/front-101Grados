export interface Award {
  id: number;
  code: string;
  name: string;
  mainImage: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Category {
  id: number;
  icon: string;
  image: string;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  category: Category;
}

export interface SubcategoriesList {
  category_id: number;
  category_name: string;
  category_image: string;
  category_icon: string;
  subcategory_id: number;
  subcategory_name: string;
}
