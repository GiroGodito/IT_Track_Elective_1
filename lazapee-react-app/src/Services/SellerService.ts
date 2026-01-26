import api from "../Components/API/axios";

// ============================================
// SELLER TYPES
// ============================================

export interface ResolveStoreNameDTO {
  sellerID: number;
  storeName: string;
}

export interface BasicSellerInfoResponse {
  success: boolean;
  message: string;
  data: ResolveStoreNameDTO;
}

// ============================================
// SELLER SERVICES
// ============================================

export const sellerService = {
  /**
   * Get basic seller information (sellerID + storeName)
   * Only accessible to users with the "Seller" role
   */
  getBasicSellerInfo: async (): Promise<BasicSellerInfoResponse> => {
    const response = await api.get<BasicSellerInfoResponse>(
      "/Seller/BasicSellerInfo"
    );
    return response.data;
  },
};
