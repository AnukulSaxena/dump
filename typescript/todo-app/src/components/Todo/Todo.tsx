import { useRef, useState } from "react";
import NewInput from "../NewInput";
import TodoTitle from "./TodoTitle";
import todoService from "../../todoService/todoService";
type TodoType = {
  _id: string;
  title: string;
  todos: string[];
};

interface TodoProp {
  todo: TodoType;
  todoIndex: number;
}

const Todo = ({ todo, todoIndex }: TodoProp) => {
  const [todoData, setTodoData] = useState(todo.todos);

  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  

  function handleData(inputData: string) {
    console.log(inputData);
    todoService.createSingleTodo(inputData, todo._id);
    setTodoData((prevData) => [...prevData, inputData]);
  }

  function handleDelete(index: number) {
    todoService.deleteSingleTodo(todo._id, index);
    setTodoData((prevData) => {
      const newData = prevData.filter((_, i) => i !== index);
      return newData;
    });
  }

  function handleDragEnd(){
    const tempTodos = [...todoData];
    const anotherTemp = tempTodos[dragTodo.current];
    tempTodos[dragTodo.current] = tempTodos[draggedOverTodo.current];
    tempTodos[draggedOverTodo.current] = anotherTemp;
    todoService.updateTodoList(tempTodos,todo._id);
    
    setTodoData(tempTodos)
  }

  return (
    <div
      key={todo._id}
      className=" w-11/12 relative pt-14 md:w-5/12  lg:w-[30%] flex flex-col  no-scrollbar overflow-y-scroll ease-in-out duration-500 rounded-md h-[30rem] bg-neutral-700"
    >
      <TodoTitle todo={todo} todoIndex={todoIndex} />
      <div className="h-fit  text-lg text-center w-full">
        {todoData.map((singleTodo, index) => (
          <div draggable
            className="w-full border-b border-neutral-400 h-10 bg-neutral-800 flex cursor-grab"
            key={singleTodo + index}
            onDragStart={() => dragTodo.current = index}
            onDragEnter={() => draggedOverTodo.current = index}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={handleDragEnd}
          >
            {singleTodo.startsWith("http") ? (
              <a
                href={singleTodo}
                className="  truncate bg-neutral-300 h-full w-full flex items-center px-2"
              >
                {singleTodo}
              </a>
            ) : (
              <p className="  truncate bg-neutral-300 h-full w-full flex items-center px-2">
                {singleTodo}
              </p>
            )}
            <div
              onClick={() => {
                handleDelete(index);
              }}
              className=" text-neutral-200 truncate w-14 h-full flex items-center justify-center  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 256 256"
                className="w-4"
              >
                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                  <path
                    className="fill-neutral-300"
                    d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z"
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full sticky bottom-0 h-10">
        <NewInput sendData={handleData} inputClass="bg-neutral-300" />
      </div>
    </div>
  );
};

export default Todo;
