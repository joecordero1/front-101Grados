export interface Award {
  id: number;
  name: string;
  mainImage: string;
  subcategories: Subcategory[];
}

export interface Category {
  id: number;
  icon: string;
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
