import React, { createContext, useContext, useState } from "react";

type TodoType = {
  _id: string;
  title: string;
  todos: string[];
};

interface ContextType {
  data: TodoType[];
  setData: React.Dispatch<React.SetStateAction<TodoType[]>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<ContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TodoType[]>([]);
  const [id, setId] = useState<string>("Default");

  return (
    <MyContext.Provider value={{ data, setData, id, setId }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): ContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
