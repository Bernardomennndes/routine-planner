import React from "react";

type BoardContextValue = {
  days: number;
  hours: number;
  cellHeight: number;
};

const defaultValue: BoardContextValue = {
  days: 7,
  hours: 24,
  cellHeight: 80,
};

const BoardContext = React.createContext<BoardContextValue>(defaultValue);

BoardContext.displayName = "BoardContext";

interface BoardContextProviderProps {
  children: React.ReactNode;
}

export function BoardContextProvider(props: BoardContextProviderProps) {
  const { children } = props;

  return (
    <BoardContext.Provider value={defaultValue}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const value = React.useContext(BoardContext);

  return value ?? defaultValue;
}
