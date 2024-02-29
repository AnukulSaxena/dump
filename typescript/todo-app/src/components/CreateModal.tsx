import todoService from "../todoService/todoService.ts";
import NewInput from "./NewInput";

const CreateModal = () => {
  function handleData(inputData: string): void {
    todoService.createTodo({ title: inputData });
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
