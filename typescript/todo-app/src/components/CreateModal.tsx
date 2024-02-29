import todoService from "../todoService/todoService.ts";
import { useMyContext } from "./MyContext.tsx";
import NewInput from "./NewInput";

const CreateModal = ({ setIsOpen }: any) => {
  const { id, setData } = useMyContext();
  function handleData(inputData: string): void {
    todoService
      .createTodo({ title: inputData, owner: id })
      .then((response) => setData((prevData) => [...prevData, response.data]))
      .then(() => setIsOpen((prev: any) => !prev));
  }
  return (
    <div className="bg-neutral-800 backdrop-blur-sm flex justify-center items-center bg-opacity-40 fixed inset-0">
      <div className="w-96 h-40 rounded-sm  px-5 py-14 bg-neutral-300">
        <NewInput sendData={handleData} />
      </div>
    </div>
  );
};

export default CreateModal;
