import { useEffect, useState } from "react";
import { useMyContext } from "../MyContext";
import NewInput from "../NewInput";
import CreateModal from "../CreateModal";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { setId, mode } = useMyContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  function handleData(inputData: string) {
    setId(inputData);
    localStorage.setItem("todoAppId", inputData);
  }

  useEffect(() => {}, [mode]);

  return (
    <>
      {isHomePage && isOpen && <CreateModal setIsOpen={setIsOpen} />}
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

        <div className="h-full flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" className="w-24">Home</Button>
          </Link>
          <Link to="/stack">
            <Button variant="outline" className="w-24">Stack</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
