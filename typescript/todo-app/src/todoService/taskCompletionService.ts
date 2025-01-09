import { TaskCompletion, TaskCompletionArraySchema,  } from "@/models";
import axios, { AxiosInstance } from "axios";


class TaskCompletionService {
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

  async createTaskCompletion(data: TaskCompletion) {
    try {
      const response = await this.axiosInstance.post("/task-completion", data);
      return response.data;
    } catch (error) {
      throw new Error("Error creating Task Completion");
    }
  }

  async getOwnerTaskCompletions(owner: string, date: string) {
    try {
      const response = await this.axiosInstance.get(`/task-completion/${owner}/${date}`);

      return TaskCompletionArraySchema.parse(response?.data?.data);
    } catch (error) {
      throw new Error("Error creating daily task");
    }
  }

  async deleteTaskCompletion(owner: string, taskId: string) {
    try {
      const response = await this.axiosInstance.delete(`/task-completion/${owner}/${taskId}`);
      
      return response?.data || [];
    } catch (error) {
      throw new Error("Error creating daily task");
    }
  }
}

const taskCompletionService = new TaskCompletionService();

export default taskCompletionService;
