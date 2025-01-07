import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import todoService from "@/todoService/todoService";
import { useMyContext } from "./MyContext";
import { DailyTaskArraySchema, DailyTaskWithId, DailyTaskWithIdSchema } from "@/models";

const DailyTaskModal = () => {
  const { id } = useMyContext();

  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() && id) {
      todoService
        .createDailyTask({ owner: id, title: newTask.trim() })
        .then((response) => {
          console.log("Task created:", response);
          setTasks((prevTasks) => [...prevTasks, newTask.trim()]);
          setNewTask("");
        });
    }
  };

  useEffect(() => {
    if (id) {
      todoService.getOwnerDailyTasks(id).then((response: DailyTaskWithId[]) => {
        console.log("Fetched tasks:", response);
        DailyTaskArraySchema.parse(response)

        setTasks(response.map((task) => task.title));
      });
    }
  },[])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-neutral-600">
          Daily Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daily Tasks</DialogTitle>
          <DialogDescription>
            Add and manage your daily tasks efficiently.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="space-y-4">
          {/* Input and Button */}
          <div className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
              className="flex-1"
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
          {/* Task List */}
          <ul className="space-y-2">
            {tasks.length === 0 && (
              <p className="text-muted-foreground">No tasks added yet.</p>
            )}
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-muted px-4 py-2 rounded-md border"
              >
                <span>{task}</span>
                {/* Optional: Add a delete button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setTasks((prevTasks) =>
                      prevTasks.filter((_, i) => i !== index)
                    )
                  }
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyTaskModal;
