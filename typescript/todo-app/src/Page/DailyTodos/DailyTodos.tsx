import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./DailyTodos.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DailyTodos = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-full p-6">
        <div className=" max-w-xl ">
      <Calendar 
       className="custom-calendar"
      onChange={onChange} value={value} />
    </div>
    </div>
    
  );
};

export default DailyTodos;
