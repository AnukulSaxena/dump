import { useState } from "react";
import { useMyContext } from "../MyContext";
import NewInput from "../NewInput";
import CreateModal from "../CreateModal";

const Header = () => {
  const { setId } = useMyContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleData(inputData: string) {
    setId(inputData);
    localStorage.setItem("todoAppId", inputData);
  }

  return (
    <>
      {isOpen && <CreateModal setIsOpen={setIsOpen} />}
      <div className=" bg-neutral-800 z-50  justify-between shadow-2xl lg:px-20 px-5 w-full h-16 flex fixed top-0">
        <div className="py-4 w-56 md:w-fit flex gap-5 text-neutral-300 text-nowrap">
          <h1 className="hidden md:block">Find Your Username: </h1>
          <NewInput
            sendData={handleData}
            inputClass="bg-neutral-300 "
            btnClass="text-xl px-1 text-neutral-800 bg-neutral-300 border-l border-neutral-400"
            buttonName="Enter"
          />
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
