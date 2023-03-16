export interface Award {
  id: number;
  code: string;
  name: string;
  mainImage: string;
  description: string;
  subcategories: Subcategory[];
  brand: Brand;
  model: string;
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

export interface Brand {
  id: number;
  name: string;
}

export enum VariantType {
  SIZE = "SIZE",
  COLOR = "COLOR",
  GENERAL = "GENERAL",
}

export interface AwardVariant {
  id: number;
  type: VariantType;
  image: null;
  name: string;
  level: number;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: null;
}
