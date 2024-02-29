import { useState } from "react";
interface NewInputType {
  className?: string;
  sendData: (inputData: string) => void;
  buttonName?: string;
  btnClass?: string;
  inputClass?: string;
}

const NewInput: React.FC<NewInputType> = ({
  sendData,
  className,
  buttonName = "+",
  btnClass = "text-3xl",
  inputClass,
}) => {
  const [inputData, setInputData] = useState("");

  function handleClick() {
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
        className={`px-2 flex-grow rounded-l-sm focus:outline-0 ${inputClass}`}
        type="text"
      />
      <button
        onClick={handleClick}
        className={`pb-1 w-14 text-white rounded-r-sm active:scale-95 bg-neutral-800 ${btnClass}`}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default NewInput;
