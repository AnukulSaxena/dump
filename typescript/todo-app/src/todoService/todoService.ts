import axios, { AxiosInstance } from "axios";

interface TodoData {
  title: string;
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
