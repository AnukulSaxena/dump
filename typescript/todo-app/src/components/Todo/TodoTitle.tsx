import { useState } from "react";
import { useMyContext } from "../MyContext";
import todoService from "../../todoService/todoService";
function TodoTitle({ todo, todoIndex }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { setData } = useMyContext();

  function handleDelete() {
    todoService.deleteTodos(todo._id);
    setData((prevData) => {
      const newData = prevData.filter((_, i) => i !== todoIndex);
      return newData;
    });
  }
  return (
    <div className="w-full flex h-14 absolute top-0 overflow-hidden duration-700">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full h-full flex-shrink-0 rounded-t-md absolute inset-0 bg-neutral-400 duration-700`}
      >
        <button
          onClick={handleDelete}
          className="w-20 h-fit py-1 bg-neutral-800 rounded-md m-2 text-white"
        >
          Delete
        </button>
      </div>
      <div
        className={`${
          isOpen ? "translate-x-full" : "translate-x-0"
        } w-full h-full absolute flex-shrink-0 rounded-t-md inset-0 bg-neutral-400 duration-700`}
      >
        <h1 className="text-center h-full  py-2 px-4 text-2xl font-semibold   font-mono">
          {todo.title}
        </h1>
      </div>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="absolute top-2 right-2"
      >
        <svg
          className="w-5 h-5  rounded-md ml-8 mt-2  "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
    </div>
  );
}

export default TodoTitle;
