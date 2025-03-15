import axios, { AxiosInstance } from "axios";

interface StackItem {
  _id?: string;
  title: string;
  content: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

class StackService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: String(import.meta.env.VITE_APP_SERVER_URL),
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    });
  }

  async createStackItem(stackItem: Omit<StackItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<StackItem> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<StackItem>>(
        '/stack-items',
        stackItem
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creating stack item:', error);
      throw error;
    }
  }

  async getStackItems(owner: string): Promise<StackItem[]> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<StackItem[]>>(
        '/stack-items',
        { params: { owner } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching stack items:', error);
      throw error;
    }
  }

  async updateStackItem(id: string, updates: Partial<Pick<StackItem, 'title' | 'content'>>): Promise<StackItem> {
    try {
      const response = await this.axiosInstance.put<ApiResponse<StackItem>>(
        `/stack-items/${id}`,
        updates
      );
      return response.data.data;
    } catch (error) {
      console.error('Error updating stack item:', error);
      throw error;
    }
  }

  async deleteStackItem(id: string): Promise<StackItem> {
    try {
      const response = await this.axiosInstance.delete<ApiResponse<StackItem>>(
        `/stack-items/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error deleting stack item:', error);
      throw error;
    }
  }
}

const stackService = new StackService();

export default stackService;
export type { StackItem };
