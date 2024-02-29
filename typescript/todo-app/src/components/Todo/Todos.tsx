import { useMyContext } from "../MyContext";
import Todo from "./Todo";

const Todos = () => {
  const { data, id } = useMyContext();

  return (
    <>
      <h1 className="text-center text-neutral-300 pb-5">{`${
        id ? `${id}'s ` : ""
      }ToDos`}</h1>
      <div className=" flex gap-5 flex-wrap justify-center">
        {data.map((todo, index) => (
          <Todo key={todo._id} todoIndex={index} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default Todos;
