import React, { createContext, useContext, useEffect, useState } from "react";

type TodoType = {
  _id: string;
  title: string;
  todos: string[];
};

interface ContextType {
  data: TodoType[];
  setData: React.Dispatch<React.SetStateAction<TodoType[]>>;
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MyContext = createContext<ContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedData = localStorage.getItem("todoAppId");
  console.log("Stored data:", storedData);
  if (!storedData) {
    localStorage.setItem("todoAppId", "Default");
  }
  const [data, setData] = useState<TodoType[]>([]);
  const [id, setId] = useState<string | null>(storedData);

  useEffect(() => {}, []);

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
