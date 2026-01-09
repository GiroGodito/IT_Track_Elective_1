import api from "../Components/API/axios";

export interface Product {
    productID: number;
    sellerID: number;
    categoryID: number;
    name: string;
    storeName: string;
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
};

