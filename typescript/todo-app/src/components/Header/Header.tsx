import { useState } from "react";
import { useMyContext } from "../MyContext";
import NewInput from "../NewInput";
import CreateModal from "../CreateModal";

const Header = () => {
  const { id, setId } = useMyContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleData(inputData: string) {
    setId(inputData);
  }

  return (
    <>
      {isOpen && <CreateModal setIsOpen={setIsOpen} />}
      <div className=" bg-neutral-800 justify-between shadow-2xl md:px-20 px-5 w-full h-16 flex fixed top-0">
        <div className="py-4">
          <NewInput
            sendData={handleData}
            inputClass="bg-neutral-300"
            btnClass="text-xl"
            buttonName="Enter"
          />
        </div>
        <div className="text-neutral-300 text-2xl flex items-center capitalize font-semibold">
          {id}
        </div>
        <div className="h-full w-fit flex  items-center  ">
          <button
            onClick={(): void => {
              setIsOpen((prev) => !prev);
            }}
            className=" w-24 md:w-40 rounded-sm  bg-neutral-300  hover:scale-110 ease-in duration-200 active:scale-105 "
          >
            {isOpen ? "Close" : "Create"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
