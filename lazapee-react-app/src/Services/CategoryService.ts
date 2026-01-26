import api from "../Components/API/axios";

export interface Category {
  categoryID: number;
  name: string;
  description: string;
}

export const categoryService = {
  /**
   * Get all categories
   */
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/Category/GetAllCategory");
    return response.data;
  },
};
