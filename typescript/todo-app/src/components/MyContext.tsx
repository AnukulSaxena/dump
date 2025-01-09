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
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<ContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedData = localStorage.getItem("todoAppId");
  if (!storedData) {
    localStorage.setItem("todoAppId", "Default");
  }
  const [data, setData] = useState<TodoType[]>([]);
  const [id, setId] = useState<string | null>(storedData);
  const [mode, setMode] = useState<string>("normal");

  useEffect(() => {}, []);

  return (
    <MyContext.Provider value={{ data, setData, id, setId, mode, setMode }}>
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
