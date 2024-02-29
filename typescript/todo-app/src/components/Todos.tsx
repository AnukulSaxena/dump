import { useMyContext } from "./MyContext";
import Todo from "./Todo";

const Todos = () => {
  const { data } = useMyContext();

  return (
    <div className="pt-20 flex gap-5 flex-wrap justify-center">
      {data.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
