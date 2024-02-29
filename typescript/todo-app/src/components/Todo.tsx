import { useState } from "react";
import NewInput from "./NewInput";

type TodoType = {
  _id: string;
  title: string;
  todos: string[];
};

interface TodoProp {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProp) => {
  const [todoData, setTodoData] = useState(todo.todos);
  function handleData(inputData: string) {
    setTodoData((prevData) => [...prevData, inputData]);
    console.log(inputData, todo._id);
  }
  return (
    <div
      key={todo._id}
      className="w-96 md:w-[30rem] flex flex-col md:h-[40rem] ease-in-out duration-500 rounded-md h-[30rem] bg-neutral-700"
    >
      <h1 className="text-center py-2 text-2xl font-semibold bg-neutral-400 rounded-t-md font-mono">
        {todo.title}
      </h1>
      <div className="h-fit   text-lg text-center w-full">
        {todoData.map((singleTodo, index) => (
          <div
            className="w-full h-10 bg-neutral-800 flex "
            key={singleTodo + index}
          >
            <p className="  truncate bg-neutral-300 h-full flex-grow flex items-center justify-center">
              {singleTodo}
            </p>
            <p className=" text-neutral-200 w-14 h-full flex items-center justify-center text-4xl">
              {`-`}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full h-10">
        <NewInput sendData={handleData} inputClass="bg-neutral-300" />
      </div>
    </div>
  );
};

export default Todo;
