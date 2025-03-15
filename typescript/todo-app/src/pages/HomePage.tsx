import Todos from "../components/Todo/Todos";
import { useEffect, useState } from "react";
import todoService from "../todoService/todoService";
import { useMyContext } from "../components/MyContext";
import { Button } from "@/components/ui/button";
import CreateModal from "../components/CreateModal";
import DailyTaskModal from "../components/DailyTaskModal";

const HomePage = () => {
  const { id, setData, mode } = useMyContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
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
  }, [id, setData]);

  return (
    <div className="w-full">
      {isOpen && <CreateModal setIsOpen={setIsOpen} />}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Todos</h1>
        <div className="flex gap-3">
          {mode === "daily" && <DailyTaskModal />}
          {mode === "normal" && (
            <Button 
              onClick={() => setIsOpen(true)}
              className="px-4"
            >
              Create Todo
            </Button>
          )}
        </div>
      </div>
      
      <Todos />
    </div>
  );
};

export default HomePage; 