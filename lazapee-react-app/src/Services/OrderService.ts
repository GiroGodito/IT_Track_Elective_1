import api from "../Components/API/axios";

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    middleName?: string;
    suffix?: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface OrderItem {
    orderItemID: number;
    productID: number;
    imageUrl: string;
    name: string;
    quantity: number;
    unitPrice: number;
}

export interface OrderDetails {
    orderID: number;
    sellerID: number;
    storeName: string;
    items: OrderItem[];
}

export interface ApiResponseOrders {
    success: boolean;
    message: string;
    data: {
        totalPendingOrders: number;
        pendingOrders: OrderDetails[];
    };
}

export interface CreateOrderRequest {
    shippingAddress: ShippingAddress;
    cartID: number;
}

export interface GetOrdersParams {
    currentPage: number;
    pageSize: number;
}

// Legacy order history interface (if still needed)
export interface OrderHistory {
    logID: number;
    orderID: number;
    storename: string;
    logMessage: string;
    timestamp: string;
}

// ============================================
// ORDER SERVICES
// ============================================

export const orderService = {
    /**
     * Place an order from a cart
     */
    placeOrder: async (request: CreateOrderRequest): Promise<any> => {
        const response = await api.post("/Order/OrderCart", request);
        return response.data;
    },

    /**
     * Get order details for logged-in user with pagination
     */
    getOrderDetails: async (
        params: GetOrdersParams
    ): Promise<ApiResponseOrders["data"]> => {
        const response = await api.get<ApiResponseOrders>(
            `/Order/GetOrderDetailsOfLoggedInUser?currentPage=${params.currentPage}&pageSize=${params.pageSize}`
        );
        return response.data.data;
    },

    /**
     * Get order history for logged-in user (legacy)
     */
    getOrderHistory: async (): Promise<OrderHistory[]> => {
        const response = await api.get<OrderHistory[]>("/Order/OrderHistory");
        return response.data;
    },
};

