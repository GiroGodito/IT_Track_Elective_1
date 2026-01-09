import api from "../Components/API/axios";

export interface CartItem {
    cartItemID: number;
    cartID: number;
    sellerID: number;
    productID: number;
    quantity: number;
}

export interface CartItemCount {
    username: string;
    totalCountProducts: number;
}

export interface CartItemResponse {
    success: boolean;
    message: string;
    data: number; // cartItemID
}

export interface CreateCartItemRequest {
    cartID: number;
    productID: number;
    quantity: number;
}

export interface UpdateCartItemRequest {
    cartItemID: number;
    cartID: number;
    productID: number;
    quantity: number;
}

// ============================================
// CART ITEM SERVICES
// ============================================

export const cartItemService = {
    /**
     * Get all cart items for the logged-in user
     */
    getCartItems: async (): Promise<CartItem[]> => {
        const response = await api.get<CartItem[]>("/CartItems");
        return response.data;
    },

    /**
     * Get total count of products in cart for logged-in user
     */
    getCartItemCount: async (): Promise<CartItemCount> => {
        const response = await api.get<CartItemCount>("/CartItem/cartItems/userID");
        return response.data;
    },

    /**
     * Create a new cart item
     */
    createCartItem: async (request: CreateCartItemRequest): Promise<number> => {
        const response = await api.post<CartItemResponse>(
            "/CartItem/cartItem",
            request
        );
        return response.data.data; // returns cartItemID
    },

    /**
     * Update an existing cart item
     */
    updateCartItem: async (
        cartItemID: number,
        request: UpdateCartItemRequest
    ): Promise<number> => {
        const response = await api.put<CartItemResponse>(
            `/CartItem/cartItem/cartItemID/${cartItemID}`,
            request
        );
        return response.data.data; // returns updated cartItemID
    },

    /**
     * Delete a cart item by cartItemID
     */
    deleteCartItem: async (cartItemID: number): Promise<void> => {
        await api.delete(`/CartItem/cartItem/cartItemID/${cartItemID}`);
    },
};
