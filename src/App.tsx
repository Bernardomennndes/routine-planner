import { Sidebar } from "./components/sidebar";
import { Board } from "./components/board";
import { useRoutineStore } from "./stores/routine-store";

function App() {
  const routine = useRoutineStore(({ routineIndex, routines }) =>
    routineIndex !== undefined ? routines[routineIndex] : undefined
  );

  return (
    <main className="min-h-screen w-screen flex">
      <Sidebar routine={routine} />

      <div />

      <Board routine={routine} />
    </main>
  );
}

export default App;
