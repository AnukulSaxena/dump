// App.tsx
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Todos from "./components/Todos";
import todoService from "./todoService/todoService";
import { useMyContext } from "./components/MyContext";

function App() {
  const { id, setData } = useMyContext();
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todoService.getTodos(id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [id]);
  return (
    <div className="bg-neutral-800  w-full relative text-lg py-20 min-h-screen">
      <Header />
      <Todos />
    </div>
  );
}

export default App;
