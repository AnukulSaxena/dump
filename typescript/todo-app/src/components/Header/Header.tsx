import { useMyContext } from "../MyContext";

const Header: React.FC = () => {
  const { data, setData } = useMyContext();

  return (
    <div className=" bg-neutral-800 shadow-2xl md:px-20 px-5 w-full h-16 flex justify-end fixed top-0">
      <div className="h-full w-fit flex items-center ">
        <button
          onClick={(): void => {
            setData((prev) => !prev);
          }}
          className=" w-24 md:w-40 rounded-sm  bg-neutral-300  hover:scale-110 ease-in duration-200 active:scale-105 "
        >
          {data ? "Close" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Header;
