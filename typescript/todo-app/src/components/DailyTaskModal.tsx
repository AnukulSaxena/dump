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
import { DailyTaskWithId } from "@/models";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DailyTaskModal = () => {
  const { id } = useMyContext();
  const queryClient = useQueryClient();

  const [newTask, setNewTask] = useState("");

  const { data: tasks = [], isLoading, isError } = useQuery(
    {
      queryKey: ["dailyTasks", id],
      queryFn: () => todoService.getOwnerDailyTasks(id || ""),
      enabled: !!id, 
      refetchOnWindowFocus: false
    }
  );

  const addTaskMutation = useMutation(
    {
      mutationFn: (data: {newTask:string, id:string}) =>
        todoService.createDailyTask({ owner: data.id, title: data.newTask }),
      onSuccess: () => {
        if(id)
          queryClient.invalidateQueries({ queryKey: ["dailyTasks", id] }); 
        setNewTask("");
      },
    }
  
  );

  // Delete task using useMutation
  const deleteTaskMutation = useMutation({
    mutationFn: (task:DailyTaskWithId) => todoService.deleteDailyTask(task.owner, task._id),
    onSuccess: () => {
      if(id)
        queryClient.invalidateQueries({ queryKey: ["dailyTasks", id] }); 
      setNewTask("");
    },
  }
  );

  const handleAddTask = () => {
    if (newTask.trim() && id) {
      addTaskMutation.mutate({
        newTask: newTask.trim(),
        id,
      });
    }
  };

  const handleDeleteTask = (task: DailyTaskWithId) => {
    deleteTaskMutation.mutate(task);
  };

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
            <Button
              onClick={handleAddTask}
              disabled={addTaskMutation.isPending}
            >
              {addTaskMutation.isPending ? "Adding..." : "Add Task"}
            </Button>
          </div>
          {/* Task List */}
          <ul className="space-y-2">
            {isLoading && <p>Loading tasks...</p>}
            {isError && <p>Error fetching tasks. Please try again.</p>}
            {tasks.length === 0 && !isLoading && (
              <p className="text-muted-foreground">No tasks added yet.</p>
            )}
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between bg-muted px-4 py-2 rounded-md border"
              >
                <span>{task.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTask(task)}
                  disabled={deleteTaskMutation.isPending}
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
