import api from "../Components/API/axios";

export interface CartItemDTO {
    cartItemID: number;
    productID: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface CartDTO {
    cartID: number;
    sellerID: number;
    storeName: string;
    items: CartItemDTO[];
}

export interface ApiResponseCart {
    success: boolean;
    message: string;
    data: CartDTO;
}

export interface ApiResponseUserCart {
    success: boolean;
    message: string;
    data: {
        cartList: CartDTO[];
        totalCount: number;
    };
}

export interface CartResponse {
    success: boolean;
    message: string;
    data: number; // cartID
}

export interface CreateCartRequest {
    sellerID: number;
}

export interface ViewCartParams {
    currentPage: number;
    pageSize: number;
}

// ============================================
// CART SERVICES
// ============================================

export const cartService = {
    /**
     * Get cart by cartID for logged-in user
     */
    getCartByCartID: async (cartID: number): Promise<CartDTO> => {
        const response = await api.get<ApiResponseCart>(
            `/Cart/CartByCartIDLoggedinUser/${cartID}`
        );
        return response.data.data;
    },

    /**
     * View all carts for logged-in user with pagination
     */
    viewCart: async (params: ViewCartParams): Promise<ApiResponseUserCart["data"]> => {
        const response = await api.get<ApiResponseUserCart>(
            `/Cart/ViewCart?currentPage=${params.currentPage}&pageSize=${params.pageSize}`
        );
        return response.data.data;
    },

    /**
     * Create a new cart for a seller
     */
    createCart: async (request: CreateCartRequest): Promise<number> => {
        const response = await api.post<CartResponse>("/Cart/cart", request);
        return response.data.data; // returns cartID
    },

    /**
     * Delete a cart by cartID
     */
    deleteCart: async (cartID: number): Promise<void> => {
        await api.delete(`/Cart/cart/cartID/${cartID}`);
    },
};
