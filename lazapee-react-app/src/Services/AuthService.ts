import api from "../Components/API/axios";

// ============================================
// INTERFACES
// ============================================

export interface WhoAmIResponse {
    username: string;
    roles: string[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

// ============================================
// AUTH SERVICES
// ============================================

export const authService = {
    /**
     * Login user with credentials
     * Sets HttpOnly cookie on backend
     */
    login: async (credentials: LoginRequest): Promise<void> => {
        await api.post("/Auth/login", credentials, { withCredentials: true });
    },

    /**
     * Register a new user
     */
    register: async (userData: RegisterRequest): Promise<any> => {
        const response = await api.post("/Auth/register", userData);
        return response.data;
    },

    /**
     * Get current logged-in user information
     */
    whoAmI: async (): Promise<WhoAmIResponse> => {
        const response = await api.get<WhoAmIResponse>("/Auth/whoAmI", {
            withCredentials: true,
        });
        return response.data;
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<void> => {
        await api.post("/Auth/logout");
    },
};