import React from "react";

type BoardConfig = {
  timeRange: [number, number];
  dayRange: [number, number];
  cellHeight: number;
};

type BoardContextValue = {
  settings: BoardConfig;
  setTimeRange: (timeRange: [number, number]) => void;
  setDayRange: (dayRange: [number, number]) => void;
};

const defaultConfig: BoardConfig = {
  timeRange: [0, 24],
  dayRange: [0, 6],
  cellHeight: 108,
};

const defaultContextValue: BoardContextValue = {
  settings: defaultConfig,
  setTimeRange: function (): void {
    throw new Error("Function not implemented.");
  },
  setDayRange: function (): void {
    throw new Error("Function not implemented.");
  },
};

const BoardContext = React.createContext<BoardContextValue | undefined>(
  undefined
);
BoardContext.displayName = "BoardContext";

interface BoardProviderProps {
  children: React.ReactNode;
}

export function BoardProvider(props: BoardProviderProps) {
  const { children } = props;

  const [boardConfig, setBoardConfig] = React.useState(defaultConfig);

  const setTimeRange = React.useCallback(
    (timeRange: [number, number]) =>
      setBoardConfig((prevValues) => ({ ...prevValues, timeRange })),
    []
  );

  const setDayRange = React.useCallback(
    (dayRange: [number, number]) =>
      setBoardConfig((prevValues) => ({ ...prevValues, dayRange })),
    []
  );

  const value = React.useMemo(
    () => ({
      settings: boardConfig,
      setTimeRange,
      setDayRange,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardConfig]
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBoard() {
  const value = React.useContext(BoardContext);

  if (value === undefined)
    throw new Error(
      "O hook deve ser utilizado dentro de uma instância do contexto"
    );

  return value ?? defaultContextValue;
}
