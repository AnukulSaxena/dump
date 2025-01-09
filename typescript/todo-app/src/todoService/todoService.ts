import { DailyTask, DailyTaskArraySchema,  } from "@/models";
import axios, { AxiosInstance } from "axios";

interface TodoData {
  title: string;
  owner: string;
}

class TodoService {
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

  async createTodo(data: TodoData) {
    try {
      if (!this.isValidTodoData(data)) {
        throw new Error("Invalid TodoData");
      }
      const response = await this.axiosInstance.post("/todos", data);
      console.log("Todo created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async createDailyTask(data: DailyTask) {
    try {
      const response = await this.axiosInstance.post("/daily-task", data);
      console.log("Daily Task created:", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error creating daily task");
    }
  }

  async getOwnerDailyTasks(owner: string) {
    try {
      const response = await this.axiosInstance.get(`/daily-task/${owner}`);
      console.log("Daily Task Fetched:", response.data);

      return DailyTaskArraySchema.parse(response?.data?.data);
    } catch (error) {
      throw new Error("Error creating daily task");
    }
  }

  async deleteDailyTask(owner: string, taskId: string) {
    try {
      const response = await this.axiosInstance.delete(`/daily-task/${owner}/${taskId}`);
      console.log("Daily Task Deleted:", response.data);

      return response?.data || [];
    } catch (error) {
      throw new Error("Error creating daily task");
    }
  }

  async updateTodoList(todoList: string[],todoId:string) {
    try {
      const response = await this.axiosInstance.put(`/todos/todo/${todoId}`, {
        todoList,
      });
      console.log("Todo created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async getTodos(owner: string | null = "Default") {
    try {
      const response = await this.axiosInstance.get("/todos", {
        params: { owner },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting todo:", error);
    }
  }

  async deleteTodos(todoId: string) {
    try {
      const response = await this.axiosInstance.delete(`/todos/${todoId}`);
      console.log(response);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async deleteSingleTodo(todoId: string, index: number) {
    try {
      const response = await this.axiosInstance.delete(
        `/todos/todo/${todoId}`,
        {
          params: { index: index },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async createSingleTodo(todo: string, todoId: string) {
    console.log(todo, todoId);
    try {
      const response = await this.axiosInstance.post(`/todos/todo/${todoId}`, {
        todo,
      });
      console.log("Todo created:", response.data);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  private isValidTodoData(data: TodoData): data is TodoData {
    return typeof data === "object" && typeof data.title === "string";
  }
}

const todoService = new TodoService();

export default todoService;
