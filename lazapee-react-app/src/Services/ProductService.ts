import api from "../Components/API/axios";

export interface Product {
    productID: number;
    sellerID: number;
    categoryID: number;
    name: string;
    storeName: string;
    quantityAvailable: number;
    price: number;
    isActive: boolean;
    brand: string;
    description: string;
    imageUrl: string;
    weight: number;
    width: number;
    height: number;
    length: number;
}

export interface PaginatedProduct {
    productList: Product[];
    totalCount: number;
}

export interface PaginatedProductResponse {
    success: boolean;
    message: string;
    data: PaginatedProduct;
}

export interface GetProductsParams {
    currentPage: number;
    pageSize: number;
}

export interface ProductPayload { 
    sellerID: number; 
    categoryID: number; 
    name: string; 
    price: number; 
    brand: string;
    description: string; 
    imageUrl: string; 
    weight: number; 
    width: number; 
    height: number; 
    length: number; 
    quantityAvailable: number;
}

// ============================================
// PRODUCT SERVICES
// ============================================

export const productService = {
    /**
     * Get all products (without pagination)
     */
    getAllProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>("/Product");
        return response.data;
    },

    /**
     * Get products with pagination
     */
    getProducts: async (params: GetProductsParams): Promise<PaginatedProduct> => {
        const response = await api.get<PaginatedProductResponse>(
            `/Product?currentPage=${params.currentPage}&pageSize=${params.pageSize}`
        );
        return response.data.data;
    },

    /**
     * Get a single product by ID
     */
    getProductById: async (productID: number): Promise<Product> => {
        const response = await api.get<Product>(`/Product/${productID}`);
        return response.data;
    },

    //new method as of Jan 25, 2026 Sunday
    createProduct: async (payload: ProductPayload): Promise<Product> => {
        const response = await api.post<Product>("/Product", payload); 
        return response.data;
    },
};

