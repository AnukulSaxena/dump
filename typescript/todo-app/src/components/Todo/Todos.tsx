import DailyTodos from "@/Page/DailyTodos/DailyTodos";
import { useMyContext } from "../MyContext";
import Todo from "./Todo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Todos = () => {
  const { data, id, mode, setMode } = useMyContext();

  return (
    <>
      <h1 className="text-center text-neutral-300 pb-5">{`${
        id ? `${id}'s ` : ""
      }ToDos`}</h1>
      <Tabs defaultValue={mode} className="w-full mx-auto">
        <TabsList className="flex justify-center w-fit mx-auto gap-5  bg-neutral-700">
          <TabsTrigger onClick={() => setMode("daily")} value="daily">
            Daily
          </TabsTrigger>
          <TabsTrigger onClick={() => setMode("normal")} value="normal">
            Normal
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <DailyTodos />
        </TabsContent>
        <TabsContent value="normal">
          <div className=" flex gap-5 flex-wrap justify-center">
            {data?.map((todo, index) => (
              <Todo key={todo._id} todoIndex={index} todo={todo} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Todos;
