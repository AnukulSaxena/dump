import { useState } from "react";
interface NewInputType {
  className?: string;
  sendData: (inputData: string) => void;
}

const NewInput: React.FC<NewInputType> = ({ sendData, className }) => {
  const [inputData, setInputData] = useState("");

  function handleClick() {
    console.log("dsf");
    if (inputData.trim()) {
      sendData(inputData);
    }
    setInputData("");
  }

  return (
    <div className={`w-full h-full flex ${className}`}>
      <input
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value);
        }}
        className=" px-2 flex-grow rounded-l-sm focus:outline-0"
        type="text"
      />
      <button
        onClick={handleClick}
        className="px-4 text-white disabled rounded-r-sm text-4xl flex justify-center active:scale-95 bg-neutral-800"
      >
        +
      </button>
    </div>
  );
};

export default NewInput;
