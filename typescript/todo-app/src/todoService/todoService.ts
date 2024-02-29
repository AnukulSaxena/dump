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

  async getTodos(ownerId: string = "") {
    try {
      const response = await this.axiosInstance.get("/todos", {
        params: { owner: ownerId },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting todo:", error);
    }
  }

  private isValidTodoData(data: TodoData): data is TodoData {
    return typeof data === "object" && typeof data.title === "string";
  }
}

const todoService = new TodoService();

export default todoService;
