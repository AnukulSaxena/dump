import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DailyTodos.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMyContext } from "@/components/MyContext";
import todoService from "@/todoService/todoService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DailyTaskWithId } from "@/models";
import taskCompletionService from "@/todoService/taskCompletionService";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DailyTodos = () => {
  const { id } = useMyContext();
  const queryClient = useQueryClient();
  const [value, onChange] = useState<Value>(new Date());

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dailyTasks", id],
    queryFn: () => todoService.getOwnerDailyTasks(id || ""),
    enabled: !!id,
  });

  const {
    data: taskCompletions = [],
  } = useQuery({
    queryKey: ["taskCompletions", id],
    queryFn: () => taskCompletionService.getOwnerTaskCompletions(id || "", new Date().toDateString()),
    enabled: !!id,
  });

  const addTaskMutation = useMutation(
    {
      mutationFn: (data: DailyTaskWithId) =>
        taskCompletionService.createTaskCompletion({ owner: data.owner, taskId: data._id, date: new Date() }),
      onSuccess: () => {
        if(id)
          queryClient.invalidateQueries({ queryKey: ["taskCompletions", id] }); 
      },
    }
  
  );

  console.log(taskCompletions, '00000< ----- ')

  const handleCheckChange = (
    checked: string | boolean,
    dailyTask: DailyTaskWithId
  ) => {
    console.log(checked, dailyTask)
  };

  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className=" w-full ">
        <Calendar
          className="custom-calendar"
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="w-full border border-neutral-400 p-4 rounded-sm h-full">
        <ul className="space-y-2">
          {isLoading && <p>Loading tasks...</p>}
          {isError && <p>Error fetching tasks. Please try again.</p>}
          {tasks.length === 0 && !isLoading && (
            <p className="text-muted-foreground">No tasks added yet.</p>
          )}
          {tasks.map((task) => (
            <li
              key={task._id}
              className=" flex gap-4 items-center bg-neutral-900  bg-muted px-4 py-2 rounded-md border"
            >
              <Checkbox
              value="somevalue"
                onCheckedChange={(e) => handleCheckChange(e, task)}
                id={task._id}
              />
              <label htmlFor={task._id}>{task.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyTodos;
