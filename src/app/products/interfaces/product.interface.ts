import { User } from "@auth/interfaces/user.interface";

export interface ProductsResponse {
    count: number;
    pages: number;
    products: Product[];
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: Sizes[];
    tags: string[];
    gender: Gender;
    images: string[];
    user: User;
  }
  
  

    export enum Sizes {
        XS = 'XS',
        S = 'S',
        M = 'M',
        L = 'L',
        XL = 'XL',
        XXL = 'XXL',
    }

    export enum Gender {
        MEN = 'men',
        WOMEN = 'women',
        KID = 'kid',
        UNISEX = 'unisex',
    }

    
