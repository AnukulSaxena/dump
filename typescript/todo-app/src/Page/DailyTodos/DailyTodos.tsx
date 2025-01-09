import { useEffect, useMemo, useState } from "react";
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
import { Separator } from "@/components/ui/separator";

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
    refetchOnWindowFocus: false,
  });

  const { data: taskCompletions = [], isLoading: taskCompletionLoading } =
    useQuery({
      queryKey: [
        "taskCompletions",
        id,
        (value instanceof Date ? value : new Date()).toDateString(),
      ],
      queryFn: () =>
        taskCompletionService.getOwnerTaskCompletions(
          id || "",
          (value instanceof Date ? value : new Date()).toDateString()
        ),
      enabled: !!id,
      refetchOnWindowFocus: false,
    });

  const addTaskCompletionMutation = useMutation({
    mutationFn: (data: DailyTaskWithId) =>
      taskCompletionService.createTaskCompletion({
        owner: data.owner,
        taskId: data._id,
        date: (value instanceof Date ? value : new Date()).toDateString(),
      }),
    onSuccess: () => {
      if (id)
        queryClient.invalidateQueries({ queryKey: ["taskCompletions", id] });
    },
  });

  const handleCheckChange = (
    checked: string | boolean,
    dailyTask: DailyTaskWithId
  ) => {
    if (checked) {
      addTaskCompletionMutation.mutate(dailyTask);
    }
  };

  const isSameDate = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const dailyTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        !taskCompletions.some(
          (taskCompletion) => taskCompletion.taskId._id === task._id
        ) && isSameDate(value instanceof Date ? value : null, new Date())
    );
  }, [tasks, taskCompletions]);

  const completedTasks = useMemo(() => {
    return taskCompletions.map(taskCompletion => taskCompletion.taskId)
  }, [ taskCompletions]);

  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:h-96">
      <div className=" w-full ">
        <Calendar
          className="custom-calendar"
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="w-full border border-neutral-400 p-4 rounded-sm no-scrollbar overflow-y-auto">
        {dailyTasks.length > 0 && (
          <>
            <h2 className="text-lg mb-2 font-semibold">Daily Tasks</h2>
            <ul className="space-y-2 ">
              {isLoading || (taskCompletionLoading && <p>Loading tasks...</p>)}
              {isError && <p>Error fetching tasks. Please try again.</p>}
              {tasks.length === 0 && !isLoading && (
                <p className="text-muted-foreground">No tasks added yet.</p>
              )}
              {!isLoading &&
                !taskCompletionLoading &&
                dailyTasks.map((task) => (
                  <li
                    key={task._id}
                    className=" flex gap-4 items-center bg-neutral-900  bg-muted px-4 py-2 rounded-md border"
                  >
                    <Checkbox
                      value="somevalue"
                      onCheckedChange={(e) => handleCheckChange(e, task)}
                      id={task._id}
                      disabled={addTaskCompletionMutation.isPending}
                    />
                    <label htmlFor={task._id}>{task.title}</label>
                  </li>
                ))}
            </ul>
            <Separator className="my-4 border border-neutral-400" />
          </>
        )}

        <h2 className="text-lg mb-2 font-semibold">Completed Tasks</h2>

        <ul className="space-y-2 ">
          {/* {isLoading || taskCompletionLoading && <p>Loading tasks...</p>}
          {isError && <p>Error fetching tasks. Please try again.</p>}
          {tasks.length === 0 && !isLoading && (
            <p className="text-muted-foreground">No tasks added yet.</p>
          )} */}
          {!isLoading &&
            !taskCompletionLoading &&
            completedTasks.map((task) => (
              <li
                key={task._id}
                className=" flex gap-4 items-center bg-neutral-900  bg-muted px-4 py-2 rounded-md border"
              >
                <Checkbox
                  disabled={true}
                  checked={true}
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
